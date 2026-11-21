import numpy as np, soundfile as sf
SR=48000; rng=np.random.default_rng(5)
def lp(x,a):
    y=np.empty_like(x); s=0.0
    for i in range(len(x)): s+=a*(x[i]-s); y[i]=s
    return y
out=[]
for k in range(3):
    for dur,a in ((1.5,0.05),(2.0,0.03)):  # inhale brighter, exhale darker & longer
        n=int(SR*dur); x=lp(rng.standard_normal(n),a); e=np.sin(np.pi*np.linspace(0,1,n))**1.5
        out.append(x*e); out.append(np.zeros(int(SR*0.35)))
y=np.concatenate(out); y=y/np.abs(y).max()*0.9
sf.write("sfx/breath.wav",y.astype(np.float32),SR); print("breath ok", len(y)/SR)
