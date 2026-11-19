# Bridge story SFX: rain loop, tinny old-radio song loop, water drip.
import os, numpy as np, soundfile as sf
from scipy.signal import butter, lfilter
SR=48000; rng=np.random.default_rng(33); OUT=os.path.expanduser("~/reel/sfx")
def t(d): return np.arange(int(SR*d))/SR
def norm(x,p=0.9): return x/(np.abs(x).max()+1e-9)*p
def save(n,x): sf.write(f"{OUT}/{n}.wav", norm(x).astype(np.float32), SR)
def bp(x,lo,hi): b,a=butter(2,[lo/(SR/2),hi/(SR/2)],'band'); return lfilter(b,a,x)
# rain: band-limited noise + random droplet ticks (8 s loop)
tt=t(8); r=bp(rng.standard_normal(len(tt)),600,7000)*0.5
for k in rng.integers(0,len(tt)-500,900): r[k:k+200]+=rng.standard_normal(200)*np.exp(-np.arange(200)/30)*0.6
save("rain", r)
# old song: slow minor waltz, AM-radio filtered + crackle (8 s loop)
notes=[57,60,64,60,57,60,64,62,55,59,62,59,57,60,64,69]; y=np.zeros(int(SR*8)); step=0.5
for i,n in enumerate(notes):
    f=440*2**((n-69)/12); tn=t(0.6); w=(np.sin(2*np.pi*f*tn)+0.4*np.sin(4*np.pi*f*tn))*np.exp(-tn/0.35)
    k=int(i*step*SR); y[k:k+len(w)]+=w[:len(y)-k]
    if i%4==0:
        bass=np.sin(2*np.pi*f/2*t(1.8))*np.exp(-t(1.8)/0.8)*0.6; y[k:k+len(bass)]+=bass[:len(y)-k]
y=bp(y,350,3000); y+=bp(rng.standard_normal(len(y)),1000,4000)*0.05
for k in rng.integers(0,len(y)-100,120): y[k:k+40]+=rng.standard_normal(40)*0.4
save("oldsong", y)
# drip
tt=t(0.25); f=1400*np.exp(-tt*25)+600; save("drip", np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-tt/0.04))
print("ok")
