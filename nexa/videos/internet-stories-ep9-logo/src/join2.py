# join lines; inside each line, shorten any silence > MAXP to KEEP (removes v3's mid-sentence gaps)
import json, numpy as np, soundfile as sf, subprocess, sys
SR=24000; lines=json.load(open("script.json")); T=1.12; MAXP,KEEP=0.26,0.2
def trim(a):
    e=np.abs(a); th=max(e.max()*0.02,1e-3); idx=np.where(e>th)[0]
    return a[max(idx[0]-int(.03*SR),0):idx[-1]+int(.1*SR)]
def squash(a,i):
    w=int(.01*SR); n=len(a)//w; r=np.sqrt((a[:n*w].reshape(n,w)**2).mean(1)); th=max(r.max()*0.03,2e-3)
    q=r<th; out=[]; k=0; rep=[]
    while k<n:
        if q[k]:
            j=k
            while j<n and q[j]: j+=1
            d=(j-k)*w/SR
            if d>MAXP and k>0 and j<n:
                keep=int(KEEP*SR); s,e=k*w,j*w; m=(s+e)//2
                out.append(a[s:s+keep//2]); out.append(a[e-keep//2:e]); rep.append(round(d,2))
            else: out.append(a[k*w:j*w])
            k=j
        else:
            j=k
            while j<n and not q[j]: j+=1
            out.append(a[k*w:j*w]); k=j
    out.append(a[n*w:])
    if rep: print("line",i,"shortened pauses",rep)
    return np.concatenate(out)
out=[np.zeros(int(.3*SR*T))]; starts=[]; pos=.3*T
for i,_ in enumerate(lines):
    a,sr=sf.read(f"el/{i:02d}.wav"); a=trim(a.astype(np.float32)); a=squash(a,i)
    starts.append(pos); out.append(a); pos+=len(a)/SR
    g=(.2 if i<len(lines)-1 else 1.3)*T; out.append(np.zeros(int(g*SR))); pos+=g
sf.write("vo_raw.wav",np.concatenate(out),SR)
subprocess.run(["ffmpeg","-v","error","-y","-i","vo_raw.wav","-af",f"atempo={T}","-ar","24000","vo.wav"],check=True)
d=float(subprocess.run(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0","vo.wav"],capture_output=True,text=True).stdout)
json.dump({"starts":[s/T for s in starts],"total":d},open("starts.json","w")); print("total",d)
