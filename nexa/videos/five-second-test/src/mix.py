import json, numpy as np, soundfile as sf, subprocess, os
SR=48000
vo,sr=sf.read("vo.wav"); vo=np.interp(np.arange(int(len(vo)*SR/sr))/SR, np.arange(len(vo))/sr, vo)
st=json.load(open("starts.json")); total=st["total"]; S=st["starts"]+[total]
mix=np.zeros((int(total*SR)+SR,2)); mix[:len(vo)]+=np.stack([vo,vo],1)*0.9
def add(name,t,g):
    a,_=sf.read(f"sfx/{name}.wav"); i=int(max(t,0)*SR); n=min(len(a),len(mix)-i); mix[i:i+n]+=a[:n]*g
P=lambda k,p: S[k]+(S[k+1]-S[k])*p-0.05
for k in [3,4,6,7,9,10]: add("whoosh",S[k]-0.3,0.16)
add("pop",P(0,.05),0.3); add("pop",P(0,.15),0.3)
for i in range(1,6): add("tick",0.6+i,0.35)
add("pop",P(1,.02),0.25)
for i in range(3): add("pop",P(1,.44+i*.17),0.3)
add("pop",P(2,.07),0.3); add("thump",P(2,.47),0.5)
add("swipe",P(3,.05),0.25); add("pop",P(3,.27),0.25); add("pop",P(3,.57),0.25); add("pop",P(3,.72),0.25)
for i in range(3): add("pop",P(4,.27+i*.12),0.28)
add("ping",P(5,.36),0.18); add("ping",P(5,.64),0.18)
add("riser",P(6,.35)-0.9,0.12); add("swipe",P(6,.4),0.3)
add("click",P(7,.12),0.4); add("pop",P(7,.14),0.28); add("click",P(7,.42),0.4); add("pop",P(7,.44),0.28); add("click",P(7,.7),0.4); add("pop",P(7,.72),0.28)
add("ping",P(8,.07),0.25); add("thump",P(8,.42),0.5)
for i in range(4): add("tick",P(9,.3+(i+1)/5/1.6),0.3)
add("pop",P(9,.64),0.3)
for i in range(3): add("click",P(10,.08+i*.07),0.4)
add("pop",P(10,.32),0.35); add("thump",P(10,.57),0.6); add("pop",P(10,.59),0.4)
mix=mix[:int(total*SR)]; sf.write("mix_raw.wav",mix.astype(np.float32),SR)
subprocess.run(["ffmpeg","-v","error","-y","-i","video.mp4","-i","mix_raw.wav","-af","loudnorm=I=-14:TP=-1.5:LRA=11","-c:v","copy","-c:a","aac","-b:a","192k","-ar","48000","-shortest","-movflags","+faststart","final.part.mp4"],check=True)
os.replace("final.part.mp4","final.mp4"); print("ok")
