import numpy as np, soundfile as sf
SR=48000; rng=np.random.default_rng(5)
def one():
    tt=np.arange(int(SR*0.25))/SR; f=180*np.exp(-tt*20)+70
    x=np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-tt/0.05)
    n=rng.standard_normal(len(tt))*np.exp(-tt/0.006)*0.5
    return x+n
def seq(times,dur):
    y=np.zeros(int(SR*dur))
    for t in times:
        k=int(t*SR); o=one(); y[k:k+len(o)]+=o
    return y/np.abs(y).max()*0.9
sf.write("sfx/knock.wav", seq([0],0.4).astype(np.float32), SR)
sf.write("sfx/knock2.wav", seq([0,0.32],0.8).astype(np.float32), SR)
