import os, numpy as np, soundfile as sf
SR=48000; OUT=os.path.expanduser("~/reel/sfx"); os.makedirs(OUT, exist_ok=True); rng=np.random.default_rng(5)
def norm(x): return x/(np.abs(x).max()+1e-9)*.9
# slow fingernail scratching on wood: bursts of high-passed noise with a gritty AM, 3 strokes
n=int(SR*3.2); y=np.zeros(n)
for st in [0.1,1.15,2.2]:
    L=int(SR*0.75); t=np.arange(L)/SR; nz=rng.standard_normal(L); nz=np.diff(nz,prepend=0); nz=np.diff(nz,prepend=0)
    grit=(np.sin(2*np.pi*(35+20*t)*t)>0.2)*0.7+0.3; e=np.sin(np.pi*t/0.75)**1.5
    k=int(st*SR); y[k:k+L]+=nz*grit*e
sf.write(f"{OUT}/scratch.wav", norm(y).astype(np.float32), SR)
# wooden creak: low tone with jittery pitch
t=np.arange(int(SR*1.4))/SR; f=180+40*np.sin(2*np.pi*1.3*t)+rng.standard_normal(len(t)).cumsum()*0.02
ph=np.cumsum(f)/SR; x=np.sign(np.sin(2*np.pi*ph))*0.4+np.sin(2*np.pi*ph*2)*0.3; x*=(np.sin(np.pi*t/1.4)**2)*(0.6+0.4*(rng.random(len(t))>0.3))
b=np.ones(30)/30; x=np.convolve(x,b,'same')
sf.write(f"{OUT}/creak.wav", norm(x).astype(np.float32), SR)
print("ok")
