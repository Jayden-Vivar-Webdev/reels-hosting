import json, numpy as np, soundfile as sf, subprocess, os
SR=48000
vo,sr=sf.read("vo.wav"); vo=np.interp(np.arange(int(len(vo)*SR/sr))/SR, np.arange(len(vo))/sr, vo)
st=json.load(open("starts.json")); total=st["total"]; S=st["starts"]+[total]
mix=np.zeros((int(total*SR)+SR,2)); mix[:len(vo)]+=np.stack([vo,vo],1)*0.9
def add(name,t,g):
    a,_=sf.read(f"sfx/{name}.wav"); i=int(max(t,0)*SR); n=min(len(a),len(mix)-i); mix[i:i+n]+=a[:n]*g
P=lambda k,p: S[k]+(S[k+1]-S[k])*p-0.05
for k in range(1,12): add("whoosh",S[k]-0.3,0.15); add("pop",S[k]+0.12,0.16)
for q in (.1,.18,.26): add("pop",P(0,q),0.25)
add("thump",P(0,.57),0.5)
add("thump",P(1,.62),0.5)
add("swipe",P(2,.25),0.3); add("pop",P(2,.32),0.2)
add("swipe",P(3,.05),0.3); add("ping",P(3,.45),0.2)
for q in (.2,.4,.7): add("click",P(4,q),0.4)
add("thump",P(5,.72),0.5)
add("pop",P(6,.05),0.25); add("typing",P(6,.55),0.18)
add("pop",P(7,.27),0.25); add("pop",P(7,.64),0.25)
add("riser",P(8,.0),0.05); add("thump",P(8,.64),0.5)
for q in (.47,.64,.81): add("click",P(9,q),0.4)
add("click",P(10,.5),0.4); add("click",P(10,.9),0.3)
for q in (.12,.2,.28): add("pop",P(11,q),0.22)
add("thump",P(11,.52),0.6); add("pop",P(11,.53),0.4)
mix=mix[:int(total*SR)]; sf.write("mix_raw.wav",mix.astype(np.float32),SR)
subprocess.run(["ffmpeg","-v","error","-y","-i","video.mp4","-i","mix_raw.wav","-af","loudnorm=I=-14:TP=-1.5:LRA=11","-c:v","copy","-c:a","aac","-b:a","192k","-ar","48000","-shortest","-movflags","+faststart","final.part.mp4"],check=True)
os.replace("final.part.mp4","final.mp4"); print("ok")
