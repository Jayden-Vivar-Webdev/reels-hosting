import json, sys, numpy as np, soundfile as sf, subprocess
SR=24000; lines=json.load(open("script.json")); T=float(sys.argv[1]) if len(sys.argv)>1 else 1.0
def trim(a):
    e=np.abs(a); th=max(e.max()*0.02,1e-3); idx=np.where(e>th)[0]
    return a[max(idx[0]-int(.03*SR),0):idx[-1]+int(.1*SR)]
out=[np.zeros(int(.3*SR*T))]; starts=[]; pos=.3*T
for i,_ in enumerate(lines):
    a,sr=sf.read(f"cb/{i:02d}.wav"); a=a.astype(np.float32)
    if a.ndim>1: a=a.mean(1)
    if sr!=SR: a=np.interp(np.arange(int(len(a)*SR/sr))/SR,np.arange(len(a))/sr,a).astype(np.float32)
    a=trim(a); starts.append(pos); out.append(a); pos+=len(a)/SR
    g=(.22 if i<len(lines)-1 else 1.4)*T; out.append(np.zeros(int(g*SR))); pos+=g
sf.write("vo_raw.wav",np.concatenate(out),SR)
af=f"atempo={T}" if T!=1 else "anull"
subprocess.run(["ffmpeg","-v","error","-y","-i","vo_raw.wav","-af",af,"-ar","24000","vo.wav"],check=True)
d=float(subprocess.run(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0","vo.wav"],capture_output=True,text=True).stdout)
json.dump({"starts":[s/T for s in starts],"total":d},open("starts.json","w")); print("total",d)
