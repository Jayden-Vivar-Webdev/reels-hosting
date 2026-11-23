import json, subprocess, numpy as np, soundfile as sf
T=json.load(open("tagged.json")); sr=24000
PA={0:0.5,1:0.15,2:0.3,3:0.2,4:0.55,5:0.3,6:0.55,7:0.45,8:0.6,9:0.55}
def trim(a, thr=0.006):
    idx=np.where(np.abs(a)>thr)[0]; return a[max(idx[0]-1800,0):idx[-1]+2400] if len(idx) else a
out=[np.zeros(int(sr*0.3))]; t=0.3; starts=[]
for i,_ in enumerate(T["p1"]):
    subprocess.run(["ffmpeg","-v","error","-y","-i",f"el/p1_{i}.wav","-af","atempo=1.2","-ar","24000","tmp.wav"],check=True)
    a,_=sf.read("tmp.wav",dtype="float32"); a=trim(a); a=a/(np.abs(a).max()+1e-9)*0.9
    starts.append(round(t,3)); out.append(a); t+=len(a)/sr
    g=PA.get(i,0.0); out.append(np.zeros(int(sr*g))); t+=g
out.append(np.zeros(int(sr*1.5))); y=np.concatenate(out); sf.write("p1_vo.wav",y,sr)
json.dump({"starts":starts,"dur":len(y)/sr},open("p1_lines.json","w")); print(round(len(y)/sr,2))
