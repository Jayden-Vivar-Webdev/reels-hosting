import json, numpy as np, soundfile as sf, subprocess, os
SR=48000
vo,sr=sf.read("vo.wav"); vo=np.interp(np.arange(int(len(vo)*SR/sr))/SR, np.arange(len(vo))/sr, vo)
st=json.load(open("starts.json")); total=st["total"]; S=st["starts"]+[total]
mix=np.zeros((int(total*SR)+SR,2)); mix[:len(vo)]+=np.stack([vo,vo],1)*0.9
def add(name,t,g):
    a,_=sf.read(f"sfx/{name}.wav"); i=int(max(t,0)*SR); n=min(len(a),len(mix)-i); mix[i:i+n]+=a[:n]*g
P=lambda k,p: S[k]+(S[k+1]-S[k])*p-0.05
for k in range(1,13): add("whoosh",S[k]-0.3,0.15); add("pop",S[k]+0.12,0.16)
add("pop",P(0,.05),0.25); add("ping",P(0,.35),0.2); add("pop",P(0,.6),0.25)
add("pop",P(1,.05),0.25); add("pop",P(1,.35),0.25); add("click",P(1,.4),0.35); add("click",P(1,.65),0.35); add("pop",P(1,.68),0.2)
for q in (.2,.32,.44,.56,.68,.8): add("click",P(2,q),0.3)
add("swipe",P(3,.1),0.25); add("thump",P(3,.5),0.5); add("pop",P(3,.7),0.25)
add("pop",P(4,.05),0.25); add("typing",P(4,.4),0.2); add("ping",P(4,.78),0.2)
add("pop",P(5,.05),0.25); add("pop",P(5,.22),0.2)
for q in (.55,.68,.8): add("click",P(5,q),0.4)
add("thump",P(6,.05),0.35); add("ping",P(6,.5),0.25)
add("pop",P(7,.05),0.25); add("riser",P(7,.2),0.07); add("pop",P(7,.58),0.25); add("pop",P(7,.62),0.2)
for q in range(10): add("click",P(8,.08+q*.06),0.22)
add("thump",P(8,.47),0.35)
add("pop",P(9,.05),0.25); add("swipe",P(9,.3),0.3); add("pop",P(9,.58),0.25); add("thump",P(9,.77),0.55)
add("pop",P(10,.37),0.25); add("riser",P(10,.1),0.06)
add("swipe",P(11,.05),0.25)
for q in (.32,.47,.62): add("pop",P(11,q),0.2)
add("ping",P(11,.77),0.2)
add("pop",P(12,.05),0.2); add("pop",P(12,.22),0.25); add("click",P(12,.5),0.4); add("thump",P(12,.52),0.6); add("pop",P(12,.53),0.4)
mix=mix[:int(total*SR)]; sf.write("mix_raw.wav",mix.astype(np.float32),SR)
subprocess.run(["ffmpeg","-v","error","-y","-i","video.mp4","-i","mix_raw.wav","-af","loudnorm=I=-14:TP=-1.5:LRA=11","-c:v","copy","-c:a","aac","-b:a","192k","-ar","48000","-shortest","-movflags","+faststart","final.part.mp4"],check=True)
os.replace("final.part.mp4","final.mp4"); print("ok")
