import json, numpy as np, soundfile as sf, subprocess, os
SR=48000
vo,sr=sf.read("vo.wav"); vo=np.interp(np.arange(int(len(vo)*SR/sr))/SR, np.arange(len(vo))/sr, vo)
st=json.load(open("starts.json")); total=st["total"]; S=st["starts"]+[total]
mix=np.zeros((int(total*SR)+SR,2)); mix[:len(vo)]+=np.stack([vo,vo],1)*0.9
def add(name,t,g):
    a,_=sf.read(f"sfx/{name}.wav"); i=int(max(t,0)*SR); n=min(len(a),len(mix)-i); mix[i:i+n]+=a[:n]*g
P=lambda k,p: S[k]+(S[k+1]-S[k])*p-0.05
for k in range(1,13): add("whoosh",S[k]-0.3,0.15); add("pop",S[k]+0.12,0.16)
add("pop",P(0,.08),0.25); add("thump",P(0,.3),0.5); add("pop",P(0,.72),0.25)
for q in (.15,.21,.27,.33,.39): add("pop",P(1,q),0.18)
for q in range(6): add("click",P(1,.3+q*.08),0.25)
for q in range(10): add("click",P(2,.03+q*.035),0.2)
add("pop",P(2,.4),0.25); add("ping",P(2,.72),0.2)
add("pop",P(3,.3),0.25); add("typing",P(3,.45),0.2); add("ping",P(3,.68),0.25)
add("pop",P(4,.3),0.2); add("pop",P(4,.4),0.2); add("pop",P(4,.62),0.25)
for q in range(10): add("click",P(5,.15+q*.055),0.28)
add("swipe",P(5,.55),0.35); add("riser",P(5,.3),0.06)
for q in (.05,.25,.45): add("thump",P(6,q),0.35)
add("pop",P(6,.75),0.25)
add("pop",P(7,.35),0.2); add("thump",P(7,.6),0.55)
add("swipe",P(8,.15),0.25); add("ping",P(8,.45),0.25)
add("pop",P(9,.35),0.25); add("riser",P(9,.45),0.07); add("thump",P(9,.8),0.6)
add("pop",P(10,.35),0.25); add("pop",P(10,.45),0.2)
for q in (.22,.42,.62): add("ping",P(11,q),0.18)
add("pop",P(11,.75),0.25)
add("pop",P(12,.2),0.2); add("thump",P(12,.52),0.6); add("pop",P(12,.53),0.4)
mix=mix[:int(total*SR)]; sf.write("mix_raw.wav",mix.astype(np.float32),SR)
subprocess.run(["ffmpeg","-v","error","-y","-i","video.mp4","-i","mix_raw.wav","-af","loudnorm=I=-14:TP=-1.5:LRA=11","-c:v","copy","-c:a","aac","-b:a","192k","-ar","48000","-shortest","-movflags","+faststart","final.part.mp4"],check=True)
os.replace("final.part.mp4","final.mp4"); print("ok")
