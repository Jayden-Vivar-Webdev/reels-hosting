import json, numpy as np, soundfile as sf, subprocess, os
SR=48000
vo,sr=sf.read("vo.wav"); vo=np.interp(np.arange(int(len(vo)*SR/sr))/SR, np.arange(len(vo))/sr, vo)
st=json.load(open("starts.json")); total=st["total"]; S=st["starts"]+[total]
mix=np.zeros((int(total*SR)+SR,2)); mix[:len(vo)]+=np.stack([vo,vo],1)*0.9
def add(name,t,g):
    a,_=sf.read(f"sfx/{name}.wav"); i=int(max(t,0)*SR); n=min(len(a),len(mix)-i); mix[i:i+n]+=a[:n]*g
P=lambda k,p: S[k]+(S[k+1]-S[k])*p-0.05
for k in range(1,11): add("whoosh",S[k]-0.3,0.15); add("pop",S[k]+0.12,0.16)
add("typing",P(0,.05),0.15); add("click",P(0,.64),0.4); add("thump",P(0,.72),0.5)
add("swipe",P(1,.5),0.3); add("pop",P(1,.52),0.2)
add("ping",P(2,.05),0.2); add("click",P(2,.5),0.3); add("click",P(2,.7),0.3); add("thump",P(2,.85),0.4)
for q in (.12,.24,.36): add("pop",P(3,q),0.25)
add("swipe",P(4,.15),0.3); add("thump",P(4,.55),0.4)
add("pop",P(5,.35),0.2); add("pop",P(5,.62),0.25)
add("ping",P(6,.05),0.2); add("thump",P(6,.74),0.5)
add("pop",P(7,.3),0.25); add("typing",P(7,.6),0.15)
add("ping",P(8,.27),0.25); add("click",P(8,.55),0.4); add("click",P(8,.73),0.4)
add("pop",P(9,.35),0.3)
for q in (.08,.16,.24): add("pop",P(10,q),0.22)
add("thump",P(10,.44),0.6); add("pop",P(10,.45),0.4)
mix=mix[:int(total*SR)]; sf.write("mix_raw.wav",mix.astype(np.float32),SR)
subprocess.run(["ffmpeg","-v","error","-y","-i","video.mp4","-i","mix_raw.wav","-af","loudnorm=I=-14:TP=-1.5:LRA=11","-c:v","copy","-c:a","aac","-b:a","192k","-ar","48000","-shortest","-movflags","+faststart","final.part.mp4"],check=True)
os.replace("final.part.mp4","final.mp4"); print("ok")
