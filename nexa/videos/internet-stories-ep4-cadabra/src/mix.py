import json, numpy as np, soundfile as sf, subprocess, os
SR=48000
vo,sr=sf.read("vo.wav"); vo=np.interp(np.arange(int(len(vo)*SR/sr))/SR, np.arange(len(vo))/sr, vo)
st=json.load(open("starts.json")); total=st["total"]; S=st["starts"]+[total]
mix=np.zeros((int(total*SR)+SR,2)); mix[:len(vo)]+=np.stack([vo,vo],1)*0.9
def add(name,t,g):
    a,_=sf.read(f"sfx/{name}.wav"); i=int(max(t,0)*SR); n=min(len(a),len(mix)-i); mix[i:i+n]+=a[:n]*g
P=lambda k,p: S[k]+(S[k+1]-S[k])*p-0.05
for k in range(1,12): add("whoosh",S[k]-0.3,0.15); add("pop",S[k]+0.12,0.16)
add("thump",P(0,.5),0.45)
add("typing",P(1,.62),0.22); add("ping",P(1,.88),0.22)
add("ping",P(2,.3),0.2)
add("pop",P(3,.12),0.2); add("error",P(3,.7),0.22); add("thump",P(3,.71),0.4)
add("swipe",P(4,.55),0.25); add("thump",P(4,.62),0.35)
add("typing",P(5,.2),0.22); add("ping",P(5,.6),0.22)
add("riser",P(6,.45)-0.6,0.12); add("swipe",P(6,.5),0.2)
for j in range(5): add("click",P(7,.15+j*.07),0.25)
add("thump",P(7,.6),0.35)
add("typing",P(8,.12),0.2); add("ping",P(8,.62),0.25); add("pop",P(8,.66),0.2)
add("pop",P(9,.12),0.2); add("thump",P(9,.32),0.35)
add("pop",P(10,.2),0.2); add("error",P(10,.55),0.2); add("thump",P(10,.56),0.3)
for j in range(3): add("click",P(11,.12+j*.1),0.4)
add("thump",P(11,.5),0.6); add("pop",P(11,.52),0.4)
mix=mix[:int(total*SR)]; sf.write("mix_raw.wav",mix.astype(np.float32),SR)
subprocess.run(["ffmpeg","-v","error","-y","-i","video.mp4","-i","mix_raw.wav","-af","loudnorm=I=-14:TP=-1.5:LRA=11","-c:v","copy","-c:a","aac","-b:a","192k","-ar","48000","-shortest","-movflags","+faststart","final.part.mp4"],check=True)
os.replace("final.part.mp4","final.mp4"); print("ok")
