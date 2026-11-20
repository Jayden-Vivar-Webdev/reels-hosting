import os, json, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
k = Kokoro(os.path.expanduser("~/models/kokoro/kokoro-v1.0.onnx"), os.path.expanduser("~/models/kokoro/voices-v1.0.bin"))
S = json.load(open("script.json"))
def trim(a, thr=0.01):
    idx = np.where(np.abs(a) > thr)[0]
    return a[max(idx[0]-240,0):idx[-1]+480] if len(idx) else a
VO = json.load(open("voices.json")) if os.path.exists("voices.json") else {}
PA = json.load(open("pauses.json")) if os.path.exists("pauses.json") else {}
for p, lines in S.items():
    sr = 24000; out = [np.zeros(int(sr*0.3))]; t = 0.3; starts = []
    for i, line in enumerate(lines):
        vv = VO.get(p, {}).get(str(i))
        a, sr = k.create(line, voice=vv or "am_onyx", speed=0.88 if vv else 0.96, lang="en-us")
        if vv: a = a * 0.8
        a = trim(a)
        starts.append(round(t, 3)); out.append(a); t += len(a)/sr
        gap = 0.55 if line.endswith(("...", ".")) and len(line) < 20 else 0.32
        if i == len(lines)-2: gap = 0.7
        gap = float(PA.get(p, {}).get(str(i), gap))
        out.append(np.zeros(int(sr*gap))); t += gap
    out.append(np.zeros(int(sr*1.2)))
    y = np.concatenate(out); sf.write(f"{p}_vo.wav", y, sr)
    json.dump({"starts": starts, "dur": len(y)/sr}, open(f"{p}_lines.json","w"))
    print(p, round(len(y)/sr,1))
