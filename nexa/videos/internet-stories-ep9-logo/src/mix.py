import json, numpy as np, soundfile as sf, subprocess, os
SR=48000
vo,sr=sf.read("vo.wav"); vo=np.interp(np.arange(int(len(vo)*SR/sr))/SR, np.arange(len(vo))/sr, vo)
st=json.load(open("starts.json")); total=st["total"]; S=st["starts"]+[total]
mix=np.zeros((int(total*SR)+SR,2)); mix[:len(vo)]+=np.stack([vo,vo],1)*0.9
def add(name,t,g):
    a,_=sf.read(f"sfx/{name}.wav"); i=int(max(t,0)*SR); n=min(len(a),len(mix)-i); mix[i:i+n]+=a[:n]*g
P=lambda k,p: S[k]+(S[k+1]-S[k])*p-0.05
for k in range(1,12): add("whoosh",S[k]-0.3,0.15); add("pop",S[k]+0.12,0.16)
add("pop",P(0,.12),0.25)
for q in (.25,.34,.43,.52,.61,.7): add("click",P(0,q),0.35)
add("swipe",P(0,.78),0.3); add("thump",P(0,.8),0.4)
add("pop",P(1,.5),0.25); add("riser",P(1,.5),0.07)
add("pop",P(2,.1),0.2); add("ping",P(2,.45),0.2)
add("pop",P(3,.05),0.25); add("pop",P(3,.32),0.25)
for q in (.1,.22,.33,.44,.55): add("pop",P(4,q),0.18)
add("thump",P(4,.12),0.4); add("thump",P(4,.62),0.35)
add("pop",P(5,.05),0.25); add("ping",P(5,.35),0.15)
add("typing",P(6,.05),0.18); add("thump",P(6,.72),0.5)
add("pop",P(7,.05),0.3); add("ping",P(7,.1),0.2); add("pop",P(7,.47),0.25)
add("swipe",P(8,.45),0.25); add("pop",P(8,.62),0.25)
add("swipe",P(9,.4),0.3); add("thump",P(9,.57),0.35)
add("click",P(10,.45),0.4); add("click",P(10,.7),0.4)
add("pop",P(11,.22),0.2); add("click",P(11,.62),0.4); add("thump",P(11,.62),0.6); add("pop",P(11,.63),0.4)
mix=mix[:int(total*SR)]; sf.write("mix_raw.wav",mix.astype(np.float32),SR)
subprocess.run(["ffmpeg","-v","error","-y","-i","video.mp4","-i","mix_raw.wav","-af","loudnorm=I=-14:TP=-1.5:LRA=11","-c:v","copy","-c:a","aac","-b:a","192k","-ar","48000","-shortest","-movflags","+faststart","final.part.mp4"],check=True)
os.replace("final.part.mp4","final.mp4"); print("ok")
