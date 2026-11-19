import json, numpy as np, soundfile as sf, subprocess, os
H="/root/ep2b"; SR=48000
vo,sr=sf.read(f"{H}/vo.wav"); 
vo=np.interp(np.arange(int(len(vo)*SR/sr))/SR, np.arange(len(vo))/sr, vo)
st=json.load(open(f"{H}/starts.json")); total=st["total"]
mix=np.zeros((int(total*SR)+SR,2)); mix[:len(vo)]+=np.stack([vo,vo],1)*0.9
def add(name,t,g):
    a,_=sf.read(f"{H}/sfx/{name}.wav"); i=int(max(t,0)*SR); n=min(len(a),len(mix)-i); mix[i:i+n]+=a[:n]*g
S=st["starts"]
for k,s in enumerate(S):
    if k: add("whoosh",s-0.3,0.16)
    add("pop",s+0.12,0.25)
add("ping",S[5]+0.4,0.3); add("thump",S[5]+0.5,0.35); add("riser",S[7]-1.1,0.18); add("thump",S[6]+2.2,0.4)
add("typing",S[2]+0.1,0.2); add("typing",S[3]+0.1,0.2); add("typing",S[4]+0.1,0.2); add("thump",S[9]+1.0,0.45); add("ping",S[11]+1.2,0.25)
add("thump",S[12]+2.6,0.6); add("pop",S[12]+2.65,0.4)
mix=mix[:int(total*SR)]; sf.write(f"{H}/mix_raw.wav",mix.astype(np.float32),SR)
subprocess.run(["ffmpeg","-v","error","-y","-i",f"{H}/reel_video.mp4","-i",f"{H}/mix_raw.wav","-af","loudnorm=I=-14:TP=-1.5:LRA=11","-c:v","copy","-c:a","aac","-b:a","192k","-ar","48000","-shortest","-movflags","+faststart",f"{H}/ep2b.part.mp4"],check=True)
os.replace(f"{H}/ep2b.part.mp4",f"{H}/ep2b.mp4"); print("ok")
