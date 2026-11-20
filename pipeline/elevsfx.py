import os, numpy as np, soundfile as sf
SR=48000; OUT=os.path.expanduser("~/reel/sfx"); os.makedirs(OUT, exist_ok=True)
def t(d): return np.arange(int(SR*d))/SR
def norm(x,p=0.9): return x/(np.abs(x).max()+1e-9)*p
tt=t(1.6); d=sum(np.sin(2*np.pi*f*tt)*a for f,a in [(1046.5,1),(2093,.3),(3140,.12)])*np.exp(-tt/0.45)
tt2=t(1.6); d2=sum(np.sin(2*np.pi*f*tt2)*a for f,a in [(830.6,1),(1661,.3)])*np.exp(-tt2/0.5)
y=np.zeros(int(SR*2.0)); y[:len(d)]+=d; k=int(SR*.35); y[k:k+len(d2)]+=d2[:len(y)-k]
sf.write(f"{OUT}/ding.wav", norm(y).astype(np.float32), SR)
tt=t(6); h=np.sin(2*np.pi*60*tt)+.5*np.sin(2*np.pi*120*tt)+.25*np.sin(2*np.pi*180*tt)+0.05*np.random.default_rng(3).standard_normal(len(tt))
sf.write(f"{OUT}/hum.wav", norm(h*(1+.1*np.sin(2*np.pi*.5*tt))).astype(np.float32), SR)
print("ok")
