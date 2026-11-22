import os, numpy as np, soundfile as sf
from scipy.signal import resample_poly
from kokoro_onnx import Kokoro
SR=48000; rng=np.random.default_rng(5)
def t(d): return np.arange(int(SR*d))/SR
def env(n,a,d): x=np.arange(n)/SR; return np.minimum(x/max(a,1e-4),1)*np.exp(-np.maximum(x-a,0)/d)
def save(n,x): x=x/(np.abs(x).max()+1e-9)*.9; sf.write(f"sfx/{n}.wav",x.astype(np.float32),SR)
# assistant chime: two soft rising tones
a=t(.18); b=t(.5)
ch=np.concatenate([np.sin(2*np.pi*660*a)*env(len(a),.005,.08), np.sin(2*np.pi*990*b)*env(len(b),.005,.18)])
save("ding", ch)
# smart lock: motor whirr + clunk
w=t(.45); whirr=np.sin(2*np.pi*(180+80*w)*w)*0.3*np.sin(np.pi*w/.45)+rng.standard_normal(len(w))*.05
k=t(.2); clunk=np.sin(2*np.pi*90*k)*env(len(k),.001,.04)+rng.standard_normal(len(k))*env(len(k),.0005,.01)
save("lock", np.concatenate([whirr, clunk]))
# electrical hum
h=t(3); save("hum", (np.sin(2*np.pi*50*h)+.4*np.sin(2*np.pi*100*h)+.2*np.sin(2*np.pi*150*h))*(1+.05*rng.standard_normal(len(h))))
# light switch click (relay)
c=t(.08); save("rclick2", np.diff(rng.standard_normal(len(c))*env(len(c),.0005,.006),prepend=0))
# the speaker's laugh (flat synthetic voice, slightly slowed)
k=Kokoro(os.path.expanduser("~/models/kokoro/kokoro-v1.0.onnx"),os.path.expanduser("~/models/kokoro/voices-v1.0.bin"))
y,sr=k.create("Ha. Ha. Ha. Ha.",voice="am_michael",speed=0.85,lang="en-us")
y=resample_poly(y,SR*21,sr*20)
save("laugh", y)
print("ok", len(y)/SR)
