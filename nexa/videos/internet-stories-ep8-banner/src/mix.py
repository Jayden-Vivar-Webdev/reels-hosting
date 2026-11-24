import json, numpy as np, soundfile as sf, subprocess, os
SR=48000
vo,sr=sf.read("vo.wav"); vo=np.interp(np.arange(int(len(vo)*SR/sr))/SR, np.arange(len(vo))/sr, vo)
st=json.load(open("starts.json")); total=st["total"]; S=st["starts"]+[total]
mix=np.zeros((int(total*SR)+SR,2)); mix[:len(vo)]+=np.stack([vo,vo],1)*0.9
def add(name,t,g):
    a,_=sf.read(f"sfx/{name}.wav"); i=int(max(t,0)*SR); n=min(len(a),len(mix)-i); mix[i:i+n]+=a[:n]*g
P=lambda k,p: S[k]+(S[k+1]-S[k])*p-0.05
for k in range(1,12): add("whoosh",S[k]-0.3,0.15); add("pop",S[k]+0.12,0.16)
add("click",P(0,.6),0.5); add("pop",P(0,.62),0.3); add("thump",P(0,.62),0.35)
add("pop",P(1,.1),0.25); add("ping",P(1,.4),0.18)
add("pop",P(2,.45),0.2)
add("pop",P(3,.1),0.2); add("thump",P(3,.6),0.35)
add("pop",P(4,.3),0.3); add("ping",P(4,.35),0.15)
add("riser",P(5,.05),0.08); add("ping",P(5,.6),0.2)
add("typing",P(6,.2),0.22); add("thump",P(6,.84),0.5)
add("pop",P(7,.05),0.25); add("pop",P(7,.15),0.25); add("riser",P(7,.45),0.08); add("thump",P(7,.62),0.45)
add("pop",P(8,.1),0.2); add("pop",P(8,.4),0.3)
add("swipe",P(9,.4),0.25); add("thump",P(9,.5),0.35)
add("swipe",P(10,.35),0.25); add("thump",P(10,.6),0.35)
add("pop",P(11,.3),0.2); add("click",P(11,.62),0.4); add("thump",P(11,.62),0.6); add("pop",P(11,.63),0.4)
mix=mix[:int(total*SR)]; sf.write("mix_raw.wav",mix.astype(np.float32),SR)
subprocess.run(["ffmpeg","-v","error","-y","-i","video.mp4","-i","mix_raw.wav","-af","loudnorm=I=-14:TP=-1.5:LRA=11","-c:v","copy","-c:a","aac","-b:a","192k","-ar","48000","-shortest","-movflags","+faststart","final.part.mp4"],check=True)
os.replace("final.part.mp4","final.mp4"); print("ok")
