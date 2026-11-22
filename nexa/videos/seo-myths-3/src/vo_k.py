import json, os, sys, soundfile as sf
from kokoro_onnx import Kokoro
k = Kokoro(os.path.expanduser("~/models/kokoro/kokoro-v1.0.onnx"), os.path.expanduser("~/models/kokoro/voices-v1.0.bin"))
L=json.load(open("script.json")); V=os.environ.get("VOICE","am_michael")
for i,l in enumerate(L):
    a,sr=k.create(l.get("say",l["text"]),voice=V,speed=float(os.environ.get("SPD","1.08")),lang="en-us")
    sf.write(f"lines/{i:02d}.wav",a,sr)
print("ok")
