import json, numpy as np, soundfile as sf, subprocess, os
SR=48000
vo,sr=sf.read("vo.wav"); vo=np.interp(np.arange(int(len(vo)*SR/sr))/SR, np.arange(len(vo))/sr, vo)
st=json.load(open("starts.json")); total=st["total"]; S=st["starts"]+[total]
mix=np.zeros((int(total*SR)+SR,2)); mix[:len(vo)]+=np.stack([vo,vo],1)*0.9
def add(name,t,g):
    a,_=sf.read(f"sfx/{name}.wav"); i=int(max(t,0)*SR); n=min(len(a),len(mix)-i); mix[i:i+n]+=a[:n]*g
P=lambda k,p: S[k]+(S[k+1]-S[k])*p-0.05
for k in range(1,13): add("whoosh",S[k]-0.3,0.15); add("pop",S[k]+0.12,0.16)
add("thump",P(0,.32),0.45); add("error",P(0,.72),0.22); add("thump",P(0,.73),0.4)
add("typing",P(1,.25),0.2); add("pop",P(1,.6),0.2)
for j in range(5): add("pop",P(2,.12+j*.06),0.14)
add("riser",P(3,.25)-0.3,0.12); add("cash",P(3,.7),0.2); add("pop",P(3,.72),0.2)
add("swipe",P(4,.3),0.25); add("click",P(4,.45),0.25); add("ping",P(4,.75),0.2)
add("typing",P(5,.25),0.2); add("error",P(5,.6),0.22); add("thump",P(5,.61),0.45)
add("thump",P(6,.05),0.3); add("pop",P(6,.6),0.25)
add("typing",P(7,.05),0.2); add("ping",P(7,.36),0.22); add("swipe",P(7,.64),0.3)
for j in range(3): add("cash",P(8,.1+j*.08),0.12)
add("riser",P(9,.12),0.1); add("thump",P(9,.6),0.35)
for j in range(5): add("click",P(10,.35+j*.06),0.25)
add("ping",P(11,.5),0.25); add("pop",P(11,.72),0.2)
for j in range(2): add("click",P(12,.2+j*.08),0.35)
add("thump",P(12,.5),0.6); add("pop",P(12,.52),0.4)
mix=mix[:int(total*SR)]; sf.write("mix_raw.wav",mix.astype(np.float32),SR)
subprocess.run(["ffmpeg","-v","error","-y","-i","video.mp4","-i","mix_raw.wav","-af","loudnorm=I=-14:TP=-1.5:LRA=11","-c:v","copy","-c:a","aac","-b:a","192k","-ar","48000","-shortest","-movflags","+faststart","final.part.mp4"],check=True)
os.replace("final.part.mp4","final.mp4"); print("ok")
