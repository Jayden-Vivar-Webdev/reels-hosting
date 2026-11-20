import json, numpy as np, soundfile as sf, subprocess, os
SR=48000
vo,sr=sf.read("vo.wav"); vo=np.interp(np.arange(int(len(vo)*SR/sr))/SR, np.arange(len(vo))/sr, vo)
st=json.load(open("starts.json")); total=st["total"]; S=st["starts"]+[total]
mix=np.zeros((int(total*SR)+SR,2)); mix[:len(vo)]+=np.stack([vo,vo],1)*0.9
def add(name,t,g):
    a,_=sf.read(f"sfx/{name}.wav"); i=int(max(t,0)*SR); n=min(len(a),len(mix)-i); mix[i:i+n]+=a[:n]*g
P=lambda k,p: S[k]+(S[k+1]-S[k])*p-0.05
for k in range(1,13): add("whoosh",S[k]-0.3,0.16); add("pop",S[k]+0.12,0.2)
for x in (0.0,0.28,0.56): add("click",P(0,0.1+x),0.35)
add("click",P(0,.82),0.5); add("thump",P(0,.84),0.45)
add("jingle",P(2,.15),0.13); add("thump",P(2,.5),0.35)
add("buzz",P(3,.25),0.12); add("ping",P(3,.45),0.2)
for j in range(11): add("click",P(4,.05+j*.35/11),0.3)
add("ping",P(5,.6),0.22); add("thump",P(6,.6),0.35); add("pop",P(7,.3),0.3)
add("thump",P(8,.5),0.35); add("swipe",P(9,.15),0.3); add("ping",P(9,.6),0.2)
add("pop",P(10,.5),0.3); add("click",P(11,.72),0.5); add("ping",P(11,.75),0.25)
add("thump",P(12,.55),0.6); add("pop",P(12,.57),0.4)
mix=mix[:int(total*SR)]; sf.write("mix_raw.wav",mix.astype(np.float32),SR)
subprocess.run(["ffmpeg","-v","error","-y","-i","video.mp4","-i","mix_raw.wav","-af","loudnorm=I=-14:TP=-1.5:LRA=11","-c:v","copy","-c:a","aac","-b:a","192k","-ar","48000","-shortest","-movflags","+faststart","final.part.mp4"],check=True)
os.replace("final.part.mp4","final.mp4"); print("ok")
