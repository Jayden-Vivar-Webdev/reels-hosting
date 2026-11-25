import json, numpy as np, soundfile as sf, subprocess, os
SR=48000
vo,sr=sf.read("vo.wav"); vo=np.interp(np.arange(int(len(vo)*SR/sr))/SR, np.arange(len(vo))/sr, vo)
st=json.load(open("starts.json")); total=st["total"]; S=st["starts"]+[total]
mix=np.zeros((int(total*SR)+SR,2)); mix[:len(vo)]+=np.stack([vo,vo],1)*0.9
def add(name,t,g):
    a,_=sf.read(f"sfx/{name}.wav"); i=int(max(t,0)*SR); n=min(len(a),len(mix)-i); mix[i:i+n]+=a[:n]*g
P=lambda k,p: S[k]+(S[k+1]-S[k])*p-0.05
for k in range(1,11): add("whoosh",S[k]-0.3,0.15); add("pop",S[k]+0.12,0.16)
add("swipe",P(0,.05),0.2); add("ping",P(0,.32),0.22); add("pop",P(0,.34),0.25)
add("click",P(1,.02),0.45); add("click",P(1,.44),0.45); add("click",P(1,.76),0.45)
add("pop",P(2,.22),0.22); add("pop",P(2,.37),0.22); add("pop",P(2,.57),0.2); add("pop",P(2,.64),0.2)
add("typing",P(3,.15),0.2); add("thump",P(3,.74),0.35)
for j,d in enumerate((0,.15,.35)): add("pop",P(4,d+.02),0.25)
for j in range(3): add("click",P(4,.55+0.3*(j+1)/3.2),0.4)
add("pop",P(5,.22),0.25); add("thump",P(5,.72),0.5)
add("pop",P(6,.37),0.25); add("swipe",P(6,.64),0.2); add("pop",P(6,.82),0.25)
add("typing",P(7,.02),0.18); add("pop",P(7,.32),0.25); add("typing",P(7,.55),0.15); add("ping",P(7,.87),0.2)
add("pop",P(8,.27),0.25); add("click",P(8,.55),0.45); add("ping",P(8,.86),0.22)
add("swipe",P(9,.02),0.2); add("pop",P(9,.34),0.25); add("thump",P(9,.72),0.45)
add("pop",P(10,.17),0.25); add("thump",P(10,.57),0.6); add("pop",P(10,.58),0.4)
mix=mix[:int(total*SR)]; sf.write("mix_raw.wav",mix.astype(np.float32),SR)
subprocess.run(["ffmpeg","-v","error","-y","-i","video.mp4","-i","mix_raw.wav","-af","loudnorm=I=-14:TP=-1.5:LRA=11","-c:v","copy","-c:a","aac","-b:a","192k","-ar","48000","-shortest","-movflags","+faststart","final.part.mp4"],check=True)
os.replace("final.part.mp4","final.mp4"); print("ok")
