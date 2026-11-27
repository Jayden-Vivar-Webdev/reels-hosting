import json, subprocess, numpy as np, soundfile as sf
T=json.load(open("tagged.json")); sr=24000
PA={0:0.35,1:0.1,2:0.05,3:0.1,4:0.25,5:0.25,6:0.3,7:0.1,8:0.5,9:0.4,10:0.45}
def trim(a, thr=0.006):
    idx=np.where(np.abs(a)>thr)[0]; return a[max(idx[0]-1800,0):idx[-1]+2400] if len(idx) else a
def squeeze(a, thr=0.012, mx=0.2):
    fr=240; e=np.array([np.abs(a[i:i+fr]).max() for i in range(0,len(a),fr)])
    keep=[]; run=0
    for k,v in enumerate(e):
        run = run+1 if v<thr else 0
        if run*fr/sr <= mx: keep.append(k)
    return np.concatenate([a[k*fr:(k+1)*fr] for k in keep])
out=[np.zeros(int(sr*0.3))]; t=0.3; starts=[]
for i,_ in enumerate(T["p1"]):
    subprocess.run(["ffmpeg","-v","error","-y","-i",f"el/p1_{i}.wav","-af","atempo=1.2","-ar","24000","tmp.wav"],check=True)
    a,_=sf.read("tmp.wav",dtype="float32"); a=trim(a); a=squeeze(a); a=a/(np.abs(a).max()+1e-9)*0.9
    print(i, round(len(a)/sr,2))
    starts.append(round(t,3)); out.append(a); t+=len(a)/sr
    g=PA.get(i,0.0); out.append(np.zeros(int(sr*g))); t+=g
out.append(np.zeros(int(sr*0.4))); y=np.concatenate(out); sf.write("p1_vo.wav",y,sr)
json.dump({"starts":starts,"dur":len(y)/sr},open("p1_lines.json","w")); print(round(len(y)/sr,2))
