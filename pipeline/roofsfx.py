import os, numpy as np, soundfile as sf
SR=48000; rng=np.random.default_rng(21); OUT=os.path.expanduser("~/reel/sfx")
def t(d): return np.arange(int(SR*d))/SR
def lp(x,a):
    y=np.empty_like(x); s=0.0
    for i in range(len(x)): s+=a*(x[i]-s); y[i]=s
    return y
def norm(x,p=0.9): return x/(np.abs(x).max()+1e-9)*p
def save(n,x): sf.write(f"{OUT}/{n}.wav", norm(x).astype(np.float32), SR)
# roof thump: heavy low body hit + metal flex
tt=t(0.9); f=70*np.exp(-tt*6)+38
th=np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-tt/0.18)
met=(np.sin(2*np.pi*310*tt)+0.6*np.sin(2*np.pi*467*tt))*np.exp(-tt/0.09)*0.25
th[:400]+=rng.standard_normal(400)*np.exp(-np.arange(400)/80)*0.8
save("thump", th+met)
# engine/road rumble loop (6 s)
tt=t(6); e=lp(rng.standard_normal(len(tt)),0.01)*6 + 0.3*np.sin(2*np.pi*42*tt)+0.15*np.sin(2*np.pi*84*tt)
save("engine", e*(0.85+0.15*np.sin(2*np.pi*0.3*tt)))
# sunroof motor slide (1.2 s whirr)
tt=t(1.2); m=np.sign(np.sin(2*np.pi*(140+20*tt)*tt))*0.4 + lp(rng.standard_normal(len(tt)),0.2)
env=np.minimum(tt/0.05,1)*np.minimum((1.2-tt)/0.08,1)
x=m*env; x[-2000:]+= (np.sin(2*np.pi*900*t(2000/SR))*np.exp(-t(2000/SR)/0.01))*2
save("slide", x)
# high-beam flash click
tt=t(0.08); save("flash", (np.diff(rng.standard_normal(len(tt)),prepend=0))*np.exp(-tt/0.008)+0.5*np.sin(2*np.pi*1800*tt)*np.exp(-tt/0.01))
print("ok")
