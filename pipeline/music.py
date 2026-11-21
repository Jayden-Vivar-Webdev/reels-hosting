# Creepy music bed: detuned music box (A minor) + low string pad, with reverb. Writes sfx/music.wav (60 s)
import numpy as np, soundfile as sf
from scipy.signal import fftconvolve, butter, lfilter
SR=48000; DUR=60; n=SR*DUR; rng=np.random.default_rng(11)
y=np.zeros(n)
def note(f, d=2.2):
    t=np.arange(int(SR*d))/SR
    s=(np.sin(2*np.pi*f*t)*np.exp(-t/0.9)+0.35*np.sin(2*np.pi*f*2.0*t)*np.exp(-t/0.35)+0.18*np.sin(2*np.pi*f*5.4*t)*np.exp(-t/0.08))
    return s*np.minimum(1,t/0.003)
A4=440; semi=lambda k: A4*2**(k/12)
mel=[0,3,7,5,3,2,0,-1, 0,3,7,8,7,3,5,-1, 0,3,7,5,3,2,0,-4, -1,0,2,3,-1,-4,-5,-1]
beat=0.52; t0=0.4; i=0
while t0<DUR-3:
    k=mel[i%len(mel)]; f=semi(k+12)*(1+rng.normal(0,0.004))*(0.985 if (i//len(mel))%2 else 1)  # warped, out of tune
    s=note(f); a=int(t0*SR); y[a:a+len(s)]+=s[:n-a]*0.5
    t0+=beat*(1+rng.normal(0,0.05))*(1.6 if i%8==7 else 1); i+=1
# low pad A2/E3/C3 + slow dissonant Bb creeping in later
t=np.arange(n)/SR
pad=sum(np.sin(2*np.pi*f*t+np.sin(2*np.pi*0.2*t)*0.3)*a for f,a in [(110,1),(164.8,.6),(130.8,.5),(55,.7)])
pad+=np.sin(2*np.pi*116.5*t)*0.5*np.clip((t-30)/8,0,1)
pad*=0.25*(0.7+0.3*np.sin(2*np.pi*0.06*t))
b,a=butter(2,600/(SR/2)); pad=lfilter(b,a,pad)
ir=rng.standard_normal(int(SR*2.5))*np.exp(-np.arange(int(SR*2.5))/SR/0.8)
wet=fftconvolve(y,ir)[:n]; wet*=0.6*np.abs(y).max()/(np.abs(wet).max()+1e-9)
m=y*0.6+wet+pad*np.abs(y).max()
m/=np.abs(m).max()+1e-9
sf.write("sfx/music.wav",(m*0.9).astype(np.float32),SR); print("music ok")
