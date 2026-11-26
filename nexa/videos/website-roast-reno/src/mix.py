import json, numpy as np, soundfile as sf, subprocess, os
SR=48000
vo,sr=sf.read("vo.wav"); vo=np.interp(np.arange(int(len(vo)*SR/sr))/SR, np.arange(len(vo))/sr, vo)
st=json.load(open("starts.json")); total=st["total"]; S=st["starts"]+[total]
mix=np.zeros((int(total*SR)+SR,2)); mix[:len(vo)]+=np.stack([vo,vo],1)*0.9
def add(name,t,g):
    a,_=sf.read(f"sfx/{name}.wav"); i=int(max(t,0)*SR); n=min(len(a),len(mix)-i); mix[i:i+n]+=a[:n]*g
P=lambda k,p: S[k]+(S[k+1]-S[k])*p-0.05
for k in range(1,9): add("whoosh",S[k]-0.3,0.15); add("pop",S[k]+0.12,0.16)
add("thump",P(0,.47),0.55); add("pop",P(0,.72),0.25)
add("pop",P(1,.47),0.25); add("pop",P(1,.72),0.2)
for q in (.2,.27,.34,.41,.48): add("swipe",P(2,q),0.12)
add("pop",P(2,.14),0.22); add("thump",P(2,.68),0.5)
add("pop",P(3,.44),0.25); add("pop",P(3,.66),0.25); add("pop",P(3,.77),0.25); add("pop",P(3,.88),0.3)
for q in (.40,.48,.56): add("click",P(4,q),0.4)
add("thump",P(4,.44),0.35); add("pop",P(4,.8),0.25)
add("typing",P(5,.05),0.12); add("pop",P(5,.51),0.25); add("pop",P(5,.65),0.25); add("pop",P(5,.81),0.25)
add("thump",P(6,.3),0.45); add("pop",P(6,.49),0.25); add("pop",P(6,.88),0.25)
add("riser",P(7,0)-0.9,0.05); add("ping",P(7,.2),0.2); add("ping",P(7,.5),0.2); add("ping",P(7,.74),0.2)
for q in (.08,.12,.16,.2,.24): add("pop",P(8,q),0.2)
add("thump",P(8,.42),0.6); add("pop",P(8,.43),0.4)
mix=mix[:int(total*SR)]; sf.write("mix_raw.wav",mix.astype(np.float32),SR)
subprocess.run(["ffmpeg","-v","error","-y","-i","video.mp4","-i","mix_raw.wav","-af","loudnorm=I=-14:TP=-1.5:LRA=11","-c:v","copy","-c:a","aac","-b:a","192k","-ar","48000","-shortest","-movflags","+faststart","final.part.mp4"],check=True)
os.replace("final.part.mp4","final.mp4"); print("ok")
