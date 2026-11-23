import json, numpy as np, soundfile as sf, subprocess, os
SR=48000
vo,sr=sf.read("vo.wav"); vo=np.interp(np.arange(int(len(vo)*SR/sr))/SR, np.arange(len(vo))/sr, vo)
st=json.load(open("starts.json")); total=st["total"]; S=st["starts"]+[total]
mix=np.zeros((int(total*SR)+SR,2)); mix[:len(vo)]+=np.stack([vo,vo],1)*0.9
def add(name,t,g):
    a,_=sf.read(f"sfx/{name}.wav"); i=int(max(t,0)*SR); n=min(len(a),len(mix)-i); mix[i:i+n]+=a[:n]*g
P=lambda k,p: S[k]+(S[k+1]-S[k])*p-0.05
for k in range(1,12): add("whoosh",S[k]-0.3,0.15); add("pop",S[k]+0.12,0.16)
add("pop",P(0,.22),0.3); add("thump",P(0,.64),0.5); add("pop",P(0,.65),0.3)
for j in range(3): add("click",P(1,.4+j*.06),0.35)
add("pop",P(1,.58),0.2)
add("typing",P(2,.15),0.2); add("thump",P(2,.33),0.4)
add("riser",P(3,.2),0.08); 
for j in range(6): add("click",P(3,.47+j*.05),0.3)
add("pop",P(3,.77),0.2)
add("pop",P(4,.12),0.2); add("pop",P(4,.42),0.2); add("ping",P(4,.52),0.18)
add("pop",P(5,.12),0.2); add("buzz",P(5,.32),0.12); add("thump",P(5,.57),0.45)
add("swipe",P(6,.25),0.3); add("buzz",P(6,.5),0.15); add("pop",P(6,.62),0.2)
add("pop",P(7,.17),0.2); add("riser",P(7,.35),0.08); add("ping",P(7,.85),0.18)
add("riser",P(8,0),0.08); add("ping",P(8,.55),0.2)
for j in range(3): add("pop",P(8,.55+j*.08),0.15)
add("buzz",P(9,.4),0.12); add("pop",P(9,.57),0.2)
add("pop",P(10,.05),0.25); add("pop",P(10,.5),0.25); add("thump",P(10,.72),0.35)
add("pop",P(11,.22),0.2); add("thump",P(11,.52),0.6); add("pop",P(11,.53),0.4)
mix=mix[:int(total*SR)]; sf.write("mix_raw.wav",mix.astype(np.float32),SR)
subprocess.run(["ffmpeg","-v","error","-y","-i","video.mp4","-i","mix_raw.wav","-af","loudnorm=I=-14:TP=-1.5:LRA=11","-c:v","copy","-c:a","aac","-b:a","192k","-ar","48000","-shortest","-movflags","+faststart","final.part.mp4"],check=True)
os.replace("final.part.mp4","final.mp4"); print("ok")
