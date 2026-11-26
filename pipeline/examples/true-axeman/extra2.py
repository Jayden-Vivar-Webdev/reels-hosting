# Axeman extras: chisel taps (scratch.wav), door creak (creak.wav), muffled old jazz from a far room (oldsong.wav)
import numpy as np, soundfile as sf
from scipy.signal import butter, lfilter
SR=48000; r=np.random.default_rng(9)
def save(n,x): sf.write(f"sfx/{n}.wav",(x/np.abs(x).max()*.9).astype(np.float32),SR)
def tap(f=2400):
    L=int(SR*.09); tt=np.arange(L)/SR
    return (np.sin(2*np.pi*f*tt)*.6+r.standard_normal(L)*.8)*np.exp(-tt/0.012)
s=np.zeros(int(SR*1.6))
for k,at in enumerate([0,.28,.55,.8,1.15]):
    x=tap(2200+150*k); a=int(at*SR); s[a:a+len(x)]+=x
save("scratch",s)
tt=np.arange(int(SR*1.4))/SR; f=180+60*np.sin(2*np.pi*1.3*tt)+30*tt
cr=np.sign(np.sin(2*np.pi*np.cumsum(f)/SR))*(r.random(len(tt))<.5)*np.sin(np.pi*tt/1.4)
b,a=butter(2,[300/(SR/2),2500/(SR/2)],'band'); save("creak",lfilter(b,a,cr))
# old jazz: stride piano + muted horn line, low-passed like it's through a wall
D=8; n=SR*D; out=np.zeros(n); bpm=150; beat=60/bpm
def note(f,d,amp,h=[(1,1),(2,.4),(3,.2)]):
    tt=np.arange(int(SR*d))/SR; return amp*sum(a*np.sin(2*np.pi*f*k*tt) for k,a in h)*np.exp(-tt/(d*.5))*np.minimum(1,tt/.005)
roots=[98,98,130.8,130.8,98,146.8,98,98]; chord=lambda f:[f*2,f*2.52,f*3]
for bar in range(int(D/(beat*4))):
    rt=roots[bar%8]
    for b in range(4):
        t0=(bar*4+b)*beat; a=int(t0*SR)
        if b%2==0: x=note(rt,beat*.9,.8)
        else: x=sum(note(f,beat*.6,.35) for f in chord(rt))
        out[a:a+len(x)]+=x[:n-a]
mel=[392,440,466,523,466,440,392,349,392,0,523,587,523,466,440,392]
for i,f in enumerate(mel*3):
    t0=i*beat*0.5*1.0+0.2; a=int(t0*SR)
    if f and a<n: x=note(f,beat*.5,.5,[(1,1),(2,.6),(3,.4),(4,.25)]); out[a:a+len(x)]+=x[:n-a]
b,a=butter(2,900/(SR/2)); out=lfilter(b,a,out)+0.02*r.standard_normal(n)*0
save("oldsong",out)
