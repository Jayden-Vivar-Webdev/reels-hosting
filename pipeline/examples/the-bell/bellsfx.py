import os, numpy as np, soundfile as sf
SR=48000; rng=np.random.default_rng(5); os.makedirs("sfx", exist_ok=True)
def t(d): return np.arange(int(SR*d))/SR
def save(n,x,p=.9): sf.write(f"sfx/{n}.wav",(x/(np.abs(x).max()+1e-9)*p).astype(np.float32),SR)
def ding(d=1.4, f=1480):
    tt=t(d); partials=[(1,1,.9),(2.0,.5,.6),(2.76,.35,.45),(5.4,.2,.25),(.5,.25,1.2)]
    y=sum(a*np.sin(2*np.pi*f*r*tt)*np.exp(-tt/dec) for r,a,dec in partials)
    y[:200]+=rng.standard_normal(200)*.3; return y
# brass bell: three uneven rings
y=np.zeros(int(SR*2.4))
for at,g in [(0,1),(.42,.8),(.95,.65)]:
    k=int(at*SR); x=ding(1.4)*g; y[k:k+len(x)]+=x[:len(y)-k]
save("bell", y)
# scissors snip
tt=t(.12); s=rng.standard_normal(len(tt))*np.exp(-tt/.01); s+=.6*np.sin(2*np.pi*3200*tt)*np.exp(-tt/.02)
save("snip", np.diff(s,prepend=0))
# a heavy creaky footstep on wood
tt=t(.7); thud=np.sin(2*np.pi*np.cumsum(70*np.exp(-tt*6)+45)/SR)*np.exp(-tt/.09)
f=180+60*np.sin(2*np.pi*3*tt)+rng.standard_normal(len(tt)).cumsum()*.2
cr=np.sign(np.sin(2*np.pi*np.cumsum(f)/SR))*np.exp(-((tt-.3)/.12)**2)*.25
save("steps", thud+cr)
print("bell sfx ok")
