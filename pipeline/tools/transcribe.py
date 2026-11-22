#!/usr/bin/env python3
"""Usage: python3 transcribe.py input.(mp4|mov|wav|m4a) [out.json] -> [{word,start,end}]"""
import json, subprocess, sys, os
import numpy as np, sherpa_onnx
M = os.path.expanduser("~/models/sherpa-onnx-nemo-parakeet-tdt-0.6b-v2-int8")
rec = sherpa_onnx.OfflineRecognizer.from_transducer(
    encoder=f"{M}/encoder.int8.onnx", decoder=f"{M}/decoder.int8.onnx",
    joiner=f"{M}/joiner.int8.onnx", tokens=f"{M}/tokens.txt",
    model_type="nemo_transducer", num_threads=os.cpu_count() or 2)
src = sys.argv[1]
out = sys.argv[2] if len(sys.argv) > 2 else os.path.splitext(src)[0] + ".words.json"
pcm = subprocess.run(["ffmpeg","-v","error","-i",src,"-ac","1","-ar","16000","-f","f32le","-"],
                     capture_output=True, check=True).stdout
audio = np.frombuffer(pcm, dtype=np.float32)
SR, WIN = 16000, 25 * 16000
fr = SR // 20; rms = np.sqrt(np.convolve(audio ** 2, np.ones(fr) / fr, "same"))
bounds = [0]
while len(audio) - bounds[-1] > WIN:
    lo, hi = bounds[-1] + WIN - 4 * SR, bounds[-1] + WIN
    bounds.append(lo + int(np.argmin(rms[lo:hi])))
bounds.append(len(audio))
words = []
for off, stop in zip(bounds, bounds[1:]):
    chunk = audio[off:stop]
    if len(chunk) < SR // 4: break
    s = rec.create_stream(); s.accept_waveform(SR, chunk); rec.decode_stream(s)
    base = off / SR; pending = False
    for tok, t in zip(s.result.tokens, s.result.timestamps):
        t = base + t
        piece = tok.replace("▁", " ").strip()
        if not piece: pending = True; continue
        new = pending or tok.startswith((" ", "▁")); pending = False
        if new or not words or words[-1]["_c"] != off:
            words.append({"word": piece, "start": round(t, 3), "end": round(t + .08, 3), "_c": off})
        else:
            words[-1]["word"] += piece; words[-1]["end"] = round(t + .08, 3)
for a, b in zip(words, words[1:]):
    a["end"] = round(min(b["start"], a["start"] + 1.2), 3)
if words: words[-1]["end"] = round(min(len(audio) / SR, words[-1]["start"] + 1.0), 3)
for w in words: w.pop("_c")
json.dump(words, open(out, "w"), indent=1)
print(" ".join(w["word"] for w in words))
