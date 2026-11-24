import json, numpy as np, soundfile as sf, subprocess, os
SR=48000
vo,sr=sf.read("vo.wav"); vo=np.interp(np.arange(int(len(vo)*SR/sr))/SR, np.arange(len(vo))/sr, vo)
st=json.load(open("starts.json")); total=st["total"]; S=st["starts"]+[total]
mix=np.zeros((int(total*SR)+SR,2)); mix[:len(vo)]+=np.stack([vo,vo],1)*0.9
def add(name,t,g):
    a,_=sf.read(f"sfx/{name}.wav"); i=int(max(t,0)*SR); n=min(len(a),len(mix)-i); mix[i:i+n]+=a[:n]*g
P=lambda k,p: S[k]+(S[k+1]-S[k])*p-0.05
for k in range(1,11): add("whoosh",S[k]-0.3,0.15); add("pop",S[k]+0.12,0.16)
add("pop",P(0,.25),0.3); add("thump",P(0,.6),0.5)
add("click",P(1,.38),0.4); add("riser",P(1,.45),0.06)
add("swipe",P(2,.25),0.25); add("swipe",P(2,.6),0.25)
add("thump",P(3,.4),0.45); add("pop",P(3,.65),0.2)
add("buzz",P(4,.45),0.12)
for j in range(3): add("pop",P(5,.27+j*.1),0.2)
add("thump",P(6,.55),0.4); add("ping",P(6,.56),0.15)
for j in range(5): add("pop",P(7,.12+j*.07),0.15)
add("typing",P(8,.25),0.2); add("ping",P(8,.6),0.2)
add("click",P(9,.5),0.4)
add("pop",P(10,.3),0.2); add("thump",P(10,.6),0.6); add("pop",P(10,.61),0.4)
mix=mix[:int(total*SR)]; sf.write("mix_raw.wav",mix.astype(np.float32),SR)
subprocess.run(["ffmpeg","-v","error","-y","-i","video.mp4","-i","mix_raw.wav","-af","loudnorm=I=-14:TP=-1.5:LRA=11","-c:v","copy","-c:a","aac","-b:a","192k","-ar","48000","-shortest","-movflags","+faststart","final.part.mp4"],check=True)
os.replace("final.part.mp4","final.mp4"); print("ok")
