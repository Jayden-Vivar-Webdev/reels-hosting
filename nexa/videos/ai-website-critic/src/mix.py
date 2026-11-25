import json, numpy as np, soundfile as sf, subprocess, os
SR=48000
vo,sr=sf.read("vo.wav"); vo=np.interp(np.arange(int(len(vo)*SR/sr))/SR, np.arange(len(vo))/sr, vo)
st=json.load(open("starts.json")); total=st["total"]; S=st["starts"]+[total]
mix=np.zeros((int(total*SR)+SR,2)); mix[:len(vo)]+=np.stack([vo,vo],1)*0.9
def add(name,t,g):
    a,_=sf.read(f"sfx/{name}.wav"); i=int(max(t,0)*SR); n=min(len(a),len(mix)-i); mix[i:i+n]+=a[:n]*g
P=lambda k,p: S[k]+(S[k+1]-S[k])*p-0.05
for k in range(1,12): add("whoosh",S[k]-0.3,0.15); add("pop",S[k]+0.12,0.16)
add("pop",P(0,.32),0.3); add("ping",P(0,.62),0.18); add("thump",P(0,.64),0.3)
add("click",P(1,.4),0.45); add("pop",P(1,.52),0.25); add("click",P(1,.6),0.45)
add("typing",P(2,.25),0.22); add("pop",P(2,.9),0.25)
for k in (3,4,5): add("pop",P(k,.08),0.3)
add("pop",P(6,.5),0.2); add("typing",P(6,.55),0.18); add("thump",P(6,.88),0.5)
add("swipe",P(7,.48),0.25); add("ping",P(7,.53),0.2)
for j in range(3): add("click",P(8,.15+j*.13),0.45)
add("swipe",P(8,.62),0.2)
add("pop",P(9,.45),0.3); add("pop",P(9,.6),0.3); add("thump",P(9,.7),0.45)
add("pop",P(10,.45),0.25); add("thump",P(10,.7),0.35)
add("typing",P(11,.3),0.18); add("thump",P(11,.6),0.6); add("pop",P(11,.61),0.4)
mix=mix[:int(total*SR)]; sf.write("mix_raw.wav",mix.astype(np.float32),SR)
subprocess.run(["ffmpeg","-v","error","-y","-i","video.mp4","-i","mix_raw.wav","-af","loudnorm=I=-14:TP=-1.5:LRA=11","-c:v","copy","-c:a","aac","-b:a","192k","-ar","48000","-shortest","-movflags","+faststart","final.part.mp4"],check=True)
os.replace("final.part.mp4","final.mp4"); print("ok")
