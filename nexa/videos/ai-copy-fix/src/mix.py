import json, numpy as np, soundfile as sf, subprocess, os
SR=48000
vo,sr=sf.read("vo.wav"); vo=np.interp(np.arange(int(len(vo)*SR/sr))/SR, np.arange(len(vo))/sr, vo)
st=json.load(open("starts.json")); total=st["total"]; S=st["starts"]+[total]
mix=np.zeros((int(total*SR)+SR,2)); mix[:len(vo)]+=np.stack([vo,vo],1)*0.9
def add(name,t,g):
    a,_=sf.read(f"sfx/{name}.wav"); i=int(max(t,0)*SR); n=min(len(a),len(mix)-i); mix[i:i+n]+=a[:n]*g
P=lambda k,p: S[k]+(S[k+1]-S[k])*p-0.05
for k in range(1,11): add("whoosh",S[k]-0.3,0.16); add("pop",S[k]+0.12,0.2)
add("pop",P(0,.3),0.3); add("thump",P(0,.55),0.45)
add("typing",P(1,.3),0.25); add("click",P(1,.76),0.45)
add("typing",P(2,.2),0.2); add("pop",P(2,.78),0.3)
for i in range(4): add("pop",P(3,i*.1+.05),0.25)
add("thump",P(3,.65),0.45)
add("pop",P(4,.05),0.3); add("pop",P(4,.4),0.3); add("ping",P(4,.65),0.2)
add("typing",P(5,.1),0.22); add("ping",P(5,.72),0.22)
add("pop",P(6,.05),0.25); add("pop",P(6,.2),0.25); add("swipe",P(6,.58),0.3)
for i in range(3): add("click",P(7,.32+i*.12),0.4)
add("riser",S[8]-1.0,0.12); add("ping",P(8,.25),0.25); add("pop",P(8,.82),0.3)
add("pop",P(9,.18),0.3); add("pop",P(9,.42),0.3)
for i in range(3): add("click",P(10,.08+i*.08),0.4)
add("thump",P(10,.57),0.6); add("pop",P(10,.59),0.4)
mix=mix[:int(total*SR)]; sf.write("mix_raw.wav",mix.astype(np.float32),SR)
subprocess.run(["ffmpeg","-v","error","-y","-i","video.mp4","-i","mix_raw.wav","-af","loudnorm=I=-14:TP=-1.5:LRA=11","-c:v","copy","-c:a","aac","-b:a","192k","-ar","48000","-shortest","-movflags","+faststart","final.part.mp4"],check=True)
os.replace("final.part.mp4","final.mp4"); print("ok")
