import json, os, re, subprocess, sys, numpy as np, soundfile as sf, torch, torchaudio
from chatterbox.tts import ChatterboxTTS
torch.set_num_threads(os.cpu_count())
m = ChatterboxTTS.from_pretrained(device="cpu")
lines = json.load(open(os.path.expanduser("~/ep2/script.json")))
os.makedirs(os.path.expanduser("~/ep2/lines"), exist_ok=True)
for i, L in enumerate(lines):
    out = os.path.expanduser(f"~/ep2/lines/{i:02d}.wav")
    if os.path.exists(out): continue
    torch.manual_seed(3)
    w = m.generate(L.get("say", L["text"]), exaggeration=0.5, cfg_weight=0.45)
    w = torchaudio.functional.resample(w, m.sr, 24000)
    sf.write(out, w.squeeze(0).numpy(), 24000); print("line", i, flush=True)
print("done")
