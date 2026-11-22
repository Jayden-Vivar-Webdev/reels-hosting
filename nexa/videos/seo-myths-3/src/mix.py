import json, numpy as np, soundfile as sf, subprocess, os
SR=48000
vo,sr=sf.read("vo.wav"); vo=np.interp(np.arange(int(len(vo)*SR/sr))/SR, np.arange(len(vo))/sr, vo)
st=json.load(open("starts.json")); total=st["total"]; S=st["starts"]
mix=np.zeros((int(total*SR)+SR,2)); mix[:len(vo)]+=np.stack([vo,vo],1)*0.9
def add(name,t,g):
    a,_=sf.read(f"sfx/{name}.wav"); i=int(max(t,0)*SR); n=min(len(a),len(mix)-i); mix[i:i+n]+=a[:n]*g
for k,s in enumerate(S):
    if k: add("whoosh",s-0.3,0.16)
    add("pop",s+0.12,0.22)
d=lambda k:(S[k+1] if k+1<len(S) else total)-S[k]
add("typing",S[0]+0.05,0.25); add("thump",S[0]+d(0)*0.6,0.4)
for k in (2,5,8): add("thump",S[k]+d(k)*0.6,0.4)
add("swipe",S[3]+d(3)*0.3,0.3); add("thump",S[3]+d(3)*0.6,0.35)
add("ping",S[4]+d(4)*0.5,0.3); add("swipe",S[6]+d(6)*0.2,0.3); add("ping",S[7]+d(7)*0.45,0.3)
add("riser",S[9]-0.2,0.12); add("thump",S[9]+d(9)*0.5,0.35); add("ping",S[10]+d(10)*0.5,0.3)
add("thump",S[11]+d(11)*0.5,0.6); add("pop",S[11]+d(11)*0.5+0.05,0.4)
mix=mix[:int(total*SR)]; sf.write("mix_raw.wav",mix.astype(np.float32),SR)
subprocess.run(["ffmpeg","-v","error","-y","-i","video.mp4","-i","mix_raw.wav","-af","loudnorm=I=-14:TP=-1.5:LRA=11","-c:v","copy","-c:a","aac","-b:a","192k","-ar","48000","-shortest","-movflags","+faststart","final.part.mp4"],check=True)
os.replace("final.part.mp4","final.mp4"); print("ok")
