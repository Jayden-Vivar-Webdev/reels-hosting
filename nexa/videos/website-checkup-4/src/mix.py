import json, numpy as np, soundfile as sf, subprocess, os
SR=48000
vo,sr=sf.read("vo.wav"); vo=np.interp(np.arange(int(len(vo)*SR/sr))/SR, np.arange(len(vo))/sr, vo)
st=json.load(open("starts.json")); total=st["total"]; S=st["starts"]+[total]
mix=np.zeros((int(total*SR)+SR,2)); mix[:len(vo)]+=np.stack([vo,vo],1)*0.9
def add(name,t,g):
    a,_=sf.read(f"sfx/{name}.wav"); i=int(max(t,0)*SR); n=min(len(a),len(mix)-i); mix[i:i+n]+=a[:n]*g
P=lambda k,p: S[k]+(S[k+1]-S[k])*p-0.05
for k in range(1,11): add("whoosh",S[k]-0.3,0.16); add("pop",S[k]+0.12,0.2)
add("pop",P(0,.05),0.3); add("thump",P(0,.38),0.45); add("pop",P(0,.62),0.25)
for i in range(4): add("pop",P(1,.1+i*.1),0.25)
add("ping",P(1,.57),0.2)
add("typing",P(2,.15),0.25); add("pop",P(2,.62),0.25)
add("pop",P(3,.15),0.3); add("thump",P(3,.58),0.45)
add("pop",P(4,.32),0.3); add("swipe",P(4,.62),0.25); add("pop",P(4,.77),0.25)
add("ping",P(5,.05),0.22); add("pop",P(5,.5),0.25); add("pop",P(5,.72),0.25)
add("typing",P(6,.15),0.22); add("click",P(6,.72),0.45); add("pop",P(6,.47),0.25)
add("riser",P(7,.1)-0.4,0.1); add("thump",P(7,.72),0.45)
add("typing",P(8,.1),0.2); add("typing",P(8,.45),0.2); add("click",P(8,.8),0.45); add("pop",P(8,.9),0.25)
add("pop",P(9,.05),0.25); add("thump",P(9,.47),0.45)
for i in range(4): add("click",P(10,.08+i*.07),0.4)
add("pop",P(10,.37),0.35); add("thump",P(10,.57),0.6); add("pop",P(10,.59),0.4)
mix=mix[:int(total*SR)]; sf.write("mix_raw.wav",mix.astype(np.float32),SR)
subprocess.run(["ffmpeg","-v","error","-y","-i","video.mp4","-i","mix_raw.wav","-af","loudnorm=I=-14:TP=-1.5:LRA=11","-c:v","copy","-c:a","aac","-b:a","192k","-ar","48000","-shortest","-movflags","+faststart","final.part.mp4"],check=True)
os.replace("final.part.mp4","final.mp4"); print("ok")
