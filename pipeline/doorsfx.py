import os, numpy as np, soundfile as sf
SR=48000; OUT=os.path.expanduser("~/reel/sfx"); os.makedirs(OUT, exist_ok=True)
def t(d): return np.arange(int(SR*d))/SR
def norm(x,p=0.9): return x/(np.abs(x).max()+1e-9)*p
# phone vibrate: two 0.35 s buzz pulses
y=np.zeros(int(SR*1.0)); rng=np.random.default_rng(4)
for s0 in (0.0,0.5):
    tt=t(0.35); b=(np.sign(np.sin(2*np.pi*170*tt))*0.6+np.sin(2*np.pi*340*tt)*0.4)*np.minimum(1,np.minimum(tt,0.35-tt)/0.02)
    k=int(s0*SR); y[k:k+len(b)]+=b
sf.write(f"{OUT}/buzz.wav", norm(y,0.7).astype(np.float32), SR)
# doorbell: classic two-note ding-dong
tt=t(2.2); y=np.zeros(len(tt))
for s0,f in ((0,659.3),(0.55,523.3)):
    x=t(1.6); n=sum(np.sin(2*np.pi*f*m*x)*a for m,a in ((1,1),(2.01,.35),(3.02,.12)))*np.exp(-x/0.5)
    k=int(s0*SR); y[k:k+len(n)]+=n[:len(y)-k]
sf.write(f"{OUT}/doorbell.wav", norm(y).astype(np.float32), SR)
# lock rattle
n=int(SR*0.5); x=np.zeros(n)
for s0,a in ((0,1),(0.07,.5),(0.19,.8),(0.26,.4)):
    k=int(s0*SR); L=int(0.03*SR); x[k:k+L]+=np.diff(rng.standard_normal(L)*np.exp(-np.arange(L)/SR/0.004),prepend=0)*a
sf.write(f"{OUT}/lock.wav", norm(x).astype(np.float32), SR)
# call ringing out (dial tone-ish ring, 3 s)
tt=t(3.0); r=(np.sin(2*np.pi*425*tt)+np.sin(2*np.pi*450*tt))*(((tt%2.0)<0.4)|(((tt%2.0)>0.6)&((tt%2.0)<1.0)))
sf.write(f"{OUT}/ringout.wav", norm(r,0.6).astype(np.float32), SR)
print("door sfx ok")
