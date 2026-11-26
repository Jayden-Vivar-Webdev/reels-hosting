import numpy as np, soundfile as sf
SR=48000; r=np.random.default_rng(3); t=np.arange(SR*6)/SR
def lp(x,a):
    y=np.zeros_like(x); s=0
    for i in range(len(x)): s+=a*(x[i]-s); y[i]=s
    return y
hum=0.5*np.sin(2*np.pi*50*t)+0.25*np.sin(2*np.pi*100*t)+0.05*r.standard_normal(len(t)); sf.write("sfx/hum.wav",(hum/np.abs(hum).max()*.9).astype(np.float32),SR)
n=r.standard_normal(len(t)); w=lp(n,0.02); env=0.55+0.45*np.sin(2*np.pi*t/5.5)**2; w=w*env; sf.write("sfx/wind.wav",(w/np.abs(w).max()*.9).astype(np.float32),SR)
L=int(SR*.12); x=r.standard_normal(L)*np.exp(-np.arange(L)/SR/0.012); x=np.diff(x,prepend=0); s=np.concatenate([x,np.zeros(int(SR*.06)),x*.8]); sf.write("sfx/snip.wav",(s/np.abs(s).max()*.9).astype(np.float32),SR)
# shovel scrape into dirt (two strokes)
def scrape(L):
    n=r.standard_normal(int(SR*L)); y=lp(n,0.25)-lp(n,0.03); e=np.sin(np.pi*np.linspace(0,1,len(y)))**.6; return y*e
s=np.concatenate([scrape(.35),np.zeros(int(SR*.25)),scrape(.3)*.8]); sf.write("sfx/dig.wav",(s/np.abs(s).max()*.9).astype(np.float32),SR)
