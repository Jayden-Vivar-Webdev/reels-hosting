import json, os, numpy as np, soundfile as sf, subprocess
H=os.path.expanduser("~/ep2"); SR=24000
lines=json.load(open(f"{H}/script.json"))
def trim(a):
    e=np.abs(a); th=max(e.max()*0.02,1e-3); idx=np.where(e>th)[0]
    return a[max(idx[0]-int(.03*SR),0):idx[-1]+int(.08*SR)]
out=[np.zeros(int(.35*SR))]; starts=[]; pos=.35
for i,_ in enumerate(lines):
    a,_=sf.read(f"{H}/lines/{i:02d}.wav"); a=trim(a.astype(np.float32))
    starts.append(pos); out.append(a); pos+=len(a)/SR
    g=.28 if i<len(lines)-1 else 1.4; out.append(np.zeros(int(g*SR))); pos+=g
vo=np.concatenate(out); sf.write(f"{H}/vo.wav",vo,SR)
json.dump({"starts":starts,"total":len(vo)/SR},open(f"{H}/starts.json","w"))
print("total",len(vo)/SR)
