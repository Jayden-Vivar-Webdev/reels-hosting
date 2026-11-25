# True-crime music bed: slow D-minor piano ostinato + sub pulse + dissonant drone and a rising string cluster. Writes sfx/music.wav (70 s)
import numpy as np, soundfile as sf
from scipy.signal import fftconvolve, butter, lfilter
SR=48000; DUR=70; n=SR*DUR; rng=np.random.default_rng(4); t=np.arange(n)/SR
def piano(f, d=3.0):
    tt=np.arange(int(SR*d))/SR
    s=sum(a*np.sin(2*np.pi*f*h*tt)*np.exp(-tt/(1.2/h)) for h,a in [(1,1),(2,.45),(3,.2),(4,.1),(6,.05)])
    return s*np.minimum(1,tt/0.004)
semi=lambda k: 293.66*2**(k/12)   # D4
pat=[0,3,7,3, 0,3,8,3, 0,3,7,3, -2,1,7,1]   # D F A F / D F Bb F / ... C# for menace
pno=np.zeros(n); t0=0.3; i=0
while t0<DUR-3:
    k=pat[i%len(pat)]; s=piano(semi(k)*(1+rng.normal(0,.002)))*(0.9 if i%4==0 else .6)
    a=int(t0*SR); pno[a:a+len(s)]+=s[:n-a]; t0+=0.62; i+=1
    if i%16==0: t0+=0.62
# low octave bass note on each bar
for b0 in np.arange(0.3, DUR-3, 0.62*4):
    s=piano(73.4, 3.5)*0.9; a=int(b0*SR); pno[a:a+len(s)]+=s[:n-a]
ir=rng.standard_normal(int(SR*3))*np.exp(-np.arange(int(SR*3))/SR/1.0)
wet=fftconvolve(pno,ir)[:n]; wet*=0.7*np.abs(pno).max()/(np.abs(wet).max()+1e-9)
pno=pno*0.55+wet
# drone D2 + Eb2 rub creeping in
dr=np.sin(2*np.pi*73.4*t)+0.6*np.sin(2*np.pi*36.7*t)+0.5*np.sin(2*np.pi*77.8*t)*np.clip((t-20)/15,0,1)
dr*=0.6+0.4*np.sin(2*np.pi*0.07*t); b,a=butter(2,400/(SR/2)); dr=lfilter(b,a,dr)
# sub pulse (heartbeat-like), faster after 35 s
pul=np.zeros(n); p0=0.3
while p0<DUR-1:
    for off,g in [(0,1),(0.22,.6)]:
        tt=np.arange(int(SR*.35))/SR; s=np.sin(2*np.pi*(55*np.exp(-tt*6)+38)*tt)*np.exp(-tt/0.1)*g
        a=int((p0+off)*SR); pul[a:a+len(s)]+=s[:n-a]
    p0+=1.24 if p0<35 else 0.95
# rising dissonant string cluster toward the reveal (~40-55 s)
cl=sum(np.sin(2*np.pi*f*t+0.4*np.sin(2*np.pi*5.5*t)) for f in [587.3,622.3,880,932.3])
cl*=np.clip((t-38)/14,0,1)**2*(t<56)*0.25
m=pno/np.abs(pno).max()*0.6+dr/np.abs(dr).max()*0.35+pul/np.abs(pul).max()*0.45+cl
m/=np.abs(m).max()+1e-9
sf.write("sfx/music.wav",(m*0.9).astype(np.float32),SR); print("music ok")
