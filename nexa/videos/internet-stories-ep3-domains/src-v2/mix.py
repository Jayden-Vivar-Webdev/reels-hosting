import json, numpy as np, soundfile as sf, subprocess, os
SR=48000
vo,sr=sf.read("vo.wav"); vo=np.interp(np.arange(int(len(vo)*SR/sr))/SR, np.arange(len(vo))/sr, vo)
st=json.load(open("starts.json")); total=st["total"]; S=st["starts"]+[total]
mix=np.zeros((int(total*SR)+SR,2)); mix[:len(vo)]+=np.stack([vo,vo],1)*0.9
def add(name,t,g):
    a,_=sf.read(f"sfx/{name}.wav"); i=int(max(t,0)*SR); n=min(len(a),len(mix)-i); mix[i:i+n]+=a[:n]*g
P=lambda k,p: S[k]+(S[k+1]-S[k])*p-0.05
for k in range(1,13): add("whoosh",S[k]-0.3,0.15); add("pop",S[k]+0.12,0.18)
add("thump",P(0,.42),0.45)
for j in range(5): add("pop",P(1,.2+j*.06),0.15)
add("typing",P(2,.25),0.22); add("pop",P(2,.75),0.2)
add("ping",P(3,.12),0.25); add("thump",P(3,.72),0.35)
for j in range(8): add("click",P(4,.15+j*.08),0.2)
add("error",P(5,.3),0.25); add("thump",P(5,.32),0.35)
add("riser",P(6,.62)-1.0,0.15); add("ping",P(6,.7),0.25)
add("thump",P(7,.42),0.4); add("pop",P(7,.57),0.3)
add("error",P(8,.2),0.2)
add("pop",P(9,.05),0.2); add("error",P(9,.25),0.2); add("thump",P(9,.62),0.35)
add("swipe",P(10,.28),0.3); add("thump",P(10,.3),0.35); add("ping",P(10,.65),0.2)
add("pop",P(11,.65),0.25); add("click",P(12,.2),0.5); add("ping",P(12,.24),0.25)
add("thump",P(12,.5),0.6); add("pop",P(12,.52),0.4)
mix=mix[:int(total*SR)]; sf.write("mix_raw.wav",mix.astype(np.float32),SR)
subprocess.run(["ffmpeg","-v","error","-y","-i","video.mp4","-i","mix_raw.wav","-af","loudnorm=I=-14:TP=-1.5:LRA=11","-c:v","copy","-c:a","aac","-b:a","192k","-ar","48000","-shortest","-movflags","+faststart","final.part.mp4"],check=True)
os.replace("final.part.mp4","final.mp4"); print("ok")
