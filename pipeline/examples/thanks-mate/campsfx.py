import os, numpy as np, soundfile as sf
SR=48000; rng=np.random.default_rng(11); os.makedirs("sfx", exist_ok=True)
def t(d): return np.arange(int(SR*d))/SR
def lp(x,a):
    from scipy.signal import lfilter
    return lfilter([a],[1,a-1],x)
def save(n,x,p=.9): sf.write(f"sfx/{n}.wav",(x/(np.abs(x).max()+1e-9)*p).astype(np.float32),SR)
# wind: slow-modulated dark noise
n=int(SR*8); x=lp(rng.standard_normal(n),0.01); m=.5+.5*np.sin(2*np.pi*np.cumsum(.08+.05*np.sin(t(8)*.7))/SR)
save("wind", x*m)
# crickets: chirp bursts
y=np.zeros(int(SR*6.4)); tt=t(.05)
for k in np.arange(0,5.9,0.42):
    for j in range(3):
        a=int((k+j*.06+rng.uniform(0,.02))*SR); y[a:a+len(tt)]+=np.sin(2*np.pi*4300*tt)*np.sin(np.pi*tt/.05)
save("crickets", y, .5)
# tent zip: rapid ratchet clicks rising
dur=.7; y=np.zeros(int(SR*dur)); pos=0.0
while pos<dur-.01:
    a=int(pos*SR); L=int(SR*.006); y[a:a+L]+=rng.standard_normal(L)*np.exp(-np.arange(L)/(SR*.0015)); pos+=.009+.004*np.sin(pos*9)
save("zip", np.diff(y,prepend=0))
# twig snap
tt=t(.25); c=rng.standard_normal(len(tt))*np.exp(-tt/.012); c[int(SR*.05):]+=rng.standard_normal(len(tt)-int(SR*.05))*np.exp(-(tt[int(SR*.05):]-.05)/.02)*.6
save("twig", np.diff(c,prepend=0))
print("camp sfx ok")
