import json, numpy as np, soundfile as sf, subprocess, os
SR=48000
vo,sr=sf.read("vo.wav"); vo=np.interp(np.arange(int(len(vo)*SR/sr))/SR, np.arange(len(vo))/sr, vo)
st=json.load(open("starts.json")); total=st["total"]; S=st["starts"]+[total]
mix=np.zeros((int(total*SR)+SR,2)); mix[:len(vo)]+=np.stack([vo,vo],1)*0.9
def add(name,t,g):
    a,_=sf.read(f"sfx/{name}.wav"); i=int(max(t,0)*SR); n=min(len(a),len(mix)-i); mix[i:i+n]+=a[:n]*g
P=lambda k,p: S[k]+(S[k+1]-S[k])*p-0.05
for k in range(1,13): add("whoosh",S[k]-0.3,0.15); add("pop",S[k]+0.12,0.16)
add("pop",P(0,.32),0.3); add("thump",P(0,.33),0.4); add("ping",P(0,.72),0.15)
add("typing",P(1,.45),0.18); add("pop",P(1,.27),0.2); add("pop",P(1,.44),0.2)
add("click",P(2,.32),0.3); add("pop",P(2,.52),0.2); add("pop",P(2,.7),0.2)
add("thump",P(3,.56),0.5); add("pop",P(3,.72),0.2)
add("swipe",P(4,.45),0.25); add("pop",P(4,.62),0.2)
add("typing",P(5,.1),0.22); add("typing",P(5,.5),0.18); add("pop",P(5,.42),0.25)
add("pop",P(6,.14),0.2); add("swipe",P(6,.38),0.3); add("ping",P(6,.64),0.2)
for j in range(6): add("pop",P(7,.1+j*.07),0.13)
add("riser",P(8,.1),0.12); add("ping",P(8,.78),0.22)
add("riser",P(9,.25)-0.2,0.1); add("thump",P(9,.72),0.5); add("ping",P(9,.74),0.2)
add("pop",P(10,.37),0.25); add("thump",P(10,.38),0.35)
for j in range(3): add("pop",P(11,.07+j*.16),0.2); add("click",P(11,.57+j*.08),0.3)
for j in range(2): add("click",P(12,.2+j*.08),0.35)
add("thump",P(12,.5),0.6); add("pop",P(12,.52),0.4)
mix=mix[:int(total*SR)]; sf.write("mix_raw.wav",mix.astype(np.float32),SR)
subprocess.run(["ffmpeg","-v","error","-y","-i","video.mp4","-i","mix_raw.wav","-af","loudnorm=I=-14:TP=-1.5:LRA=11","-c:v","copy","-c:a","aac","-b:a","192k","-ar","48000","-shortest","-movflags","+faststart","final.part.mp4"],check=True)
os.replace("final.part.mp4","final.mp4"); print("ok")
