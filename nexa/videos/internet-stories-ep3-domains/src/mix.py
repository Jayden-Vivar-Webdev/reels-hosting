import json, numpy as np, soundfile as sf, subprocess, os
SR=48000
vo,sr=sf.read("vo.wav"); vo=np.interp(np.arange(int(len(vo)*SR/sr))/SR, np.arange(len(vo))/sr, vo)
st=json.load(open("starts.json")); total=st["total"]; S=st["starts"]+[total]
mix=np.zeros((int(total*SR)+SR,2)); mix[:len(vo)]+=np.stack([vo,vo],1)*0.9
def add(name,t,g):
    a,_=sf.read(f"sfx/{name}.wav"); i=int(max(t,0)*SR); n=min(len(a),len(mix)-i); mix[i:i+n]+=a[:n]*g
P=lambda k,p: S[k]+(S[k+1]-S[k])*p-0.05
for k in range(1,12): add("whoosh",S[k]-0.3,0.16); add("pop",S[k]+0.12,0.2)
add("thump",P(0,.42),0.45)
add("typing",P(1,.35),0.22); add("ping",P(2,.35),0.25); add("pop",P(2,.62),0.3)
for j in range(8): add("click",P(3,.25+j*.07),0.25)
add("error",P(4,.35),0.25); add("thump",P(4,.37),0.35)
add("riser",P(5,.55)-1.0,0.15); add("ping",P(5,.68),0.25)
add("thump",P(6,.42),0.4); add("pop",P(6,.62),0.3)
add("error",P(8,.05),0.2); add("swipe",P(9,.35),0.3); add("thump",P(9,.37),0.35)
add("pop",P(10,.3),0.25); add("click",P(11,.27),0.5); add("ping",P(11,.3),0.25)
add("thump",P(11,.58),0.6); add("pop",P(11,.6),0.4)
mix=mix[:int(total*SR)]; sf.write("mix_raw.wav",mix.astype(np.float32),SR)
subprocess.run(["ffmpeg","-v","error","-y","-i","video.mp4","-i","mix_raw.wav","-af","loudnorm=I=-14:TP=-1.5:LRA=11","-c:v","copy","-c:a","aac","-b:a","192k","-ar","48000","-shortest","-movflags","+faststart","final.part.mp4"],check=True)
os.replace("final.part.mp4","final.mp4"); print("ok")
