import json, sys, numpy as np, soundfile as sf
from scipy.signal import resample_poly, fftconvolve
SR = 48000
def load(path):
    a, sr = sf.read(path, dtype="float32")
    if a.ndim > 1: a = a.mean(1)
    if sr != SR: a = resample_poly(a, SR, sr).astype(np.float32)
    return a
FX = {n: load(f"sfx/{n}.wav") for n in ["drone","static","radio","rclick","stinger","hit","heartbeat","paper","escalator","powerdown","door","swell","car","glitch","knock","knock2","thump","engine","slide","flash","rain","oldsong","drip"]}
GAIN = {"static":0.22,"radio":0.35,"rclick":0.4,"stinger":0.55,"hit":0.4,"heartbeat":0.5,"paper":0.3,"escalator":0.16,"powerdown":0.35,"door":0.55,"swell":0.18,"car":0.3,"glitch":0.2,"knock":0.8,"knock2":0.8,"thump":0.85,"engine":0.12,"slide":0.45,"flash":0.35,"rain":0.14,"oldsong":0.16,"drip":0.3}
rng = np.random.default_rng(1)
ir = (rng.standard_normal(int(SR*1.2)) * np.exp(-np.arange(int(SR*1.2))/SR/0.35)).astype(np.float32)
for p in json.load(open("script.json")):
    D = json.load(open(f"{p}_data.json")); n = int(D["dur"]*SR) + SR
    vo = load(f"{p}_vo.wav")
    wet = fftconvolve(vo, ir)[:len(vo)]; wet *= 0.12 * np.abs(vo).max() / (np.abs(wet).max()+1e-9)
    mix = np.zeros(n, np.float32); mix[:len(vo)] += 0.95*vo + wet
    dr = np.tile(FX["drone"], 2)[:n]; t = np.arange(n)/SR
    mix += dr * (0.10 + 0.05*np.clip(t/D["dur"],0,1))
    def add(name, at, g=None, length=None):
        x = FX[name] if length is None else np.tile(FX[name], int(length/ (len(FX[name])/SR)) + 1)[:int(length*SR)]
        if length: x = x * np.minimum(1, np.minimum(np.arange(len(x)), len(x)-np.arange(len(x)))/ (0.15*SR))
        k = int(at*SR); x = x[:max(0, n-k)]; mix[k:k+len(x)] += x * (GAIN[name] if g is None else g)
    for i, s in enumerate(D["scenes"]):
        d = s["end"] - s["start"]
        if i and "static" not in s["sfx"]: add("glitch", s["start"], 0.12)
        for f in s["sfx"]:
            if f in ("escalator", "engine", "rain", "oldsong"): add(f, s["start"], length=d+0.1)
            elif f == "thump": add(f, s["start"] + s["p"].get("at", 0))
            elif f == "drip":
                for k in np.arange(0.3, d, 0.7): add(f, s["start"]+k)
            elif f == "slide": add(f, s["start"] + s["p"].get("at", 0) + 0.4, 0.3)
            elif f == "flash":
                for q in s["p"].get("flashes", []): add(f, s["start"] + q*d)
            elif f == "heartbeat":
                for k in np.arange(0, d, 0.95): add(f, s["start"]+k)
            elif f in ("stinger", "swell") and f == "swell": add(f, max(s["start"]-0.3, 0))
            elif f == "knock2": add(f, s["end"] - 0.6)
            elif f == "stinger" and s["p"].get("at"): add(f, s["start"] + s["p"]["at"])
            elif f == "door": add(f, s["start"] + 0.6, 0.4)
            else: add(f, s["start"])
    mix = np.tanh(mix * 1.1)
    sf.write(f"{p}_mix.wav", np.stack([mix, mix], 1), SR)
    print(p, "mixed")
