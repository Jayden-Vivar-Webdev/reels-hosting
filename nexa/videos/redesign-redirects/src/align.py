"""Per-line word timings: cut each line out of vo.wav, transcribe it alone (no chunk-boundary errors),
then map caption words onto transcript words with a character-level alignment (handles
'brand-new' vs 'brand new', '$1' vs 'one dollar' spoken as '$1', etc.). Writes line_words.json."""
import json, subprocess, re, difflib, os, sys
sys.path.insert(0, os.path.expanduser("~/tools"))
H=os.path.dirname(os.path.abspath(__file__))
L=json.load(open(f"{H}/script.json")); st=json.load(open(f"{H}/starts.json"))
norm=lambda s: re.sub(r"[^a-z0-9]","",s.lower())
out=[]
for i,l in enumerate(L):
    s=st["starts"][i]; e=st["starts"][i+1] if i+1<len(L) else st["total"]
    seg=f"/tmp/line_{i}.wav"
    subprocess.run(["ffmpeg","-v","error","-y","-ss",str(s),"-to",str(e),"-i",f"{H}/vo.wav",seg],check=True)
    subprocess.run(["python3",os.path.expanduser("~/tools/transcribe.py"),seg,"/tmp/lw.json"],capture_output=True,check=True)
    tw=json.load(open("/tmp/lw.json"))
    # char stream of transcript with per-char times
    tc=[];tt=[]
    for w in tw:
        n=norm(w["word"]); d=(w["end"]-w["start"])/max(len(n),1)
        for k,c in enumerate(n): tc.append(c); tt.append(s+w["start"]+k*d)
    cw=l["text"].split(); cc=[];owner=[]
    for j,w in enumerate(cw):
        for c in norm(w): cc.append(c); owner.append(j)
    m=difflib.SequenceMatcher(None,cc,tc,autojunk=False)
    t_of=[None]*len(cc)
    for a,b,n in m.get_matching_blocks():
        for k in range(n): t_of[a+k]=tt[b+k]
    first=[None]*len(cw)
    for k,j in enumerate(owner):
        if t_of[k] is not None and first[j] is None: first[j]=t_of[k]
    # fill gaps by interpolation between known neighbours
    a0=s+(tw[0]["start"] if tw else 0); a1=s+(tw[-1]["end"] if tw else e-s)
    known=[(j,t) for j,t in enumerate(first) if t is not None]
    for j in range(len(cw)):
        if first[j] is None:
            lo=max([k for k in known if k[0]<j],default=(-1,a0),key=lambda x:x[0])
            hi=min([k for k in known if k[0]>j],default=(len(cw),a1),key=lambda x:x[0])
            first[j]=lo[1]+(hi[1]-lo[1])*(j-lo[0])/(hi[0]-lo[0])
    words=[]
    for j,w in enumerate(cw):
        st_=first[j]; en=first[j+1] if j+1<len(cw) else min(a1, st_+1.0)
        words.append({"w":w,"start":round(st_,3),"end":round(max(en,st_+0.08),3)})
    out.append(words)
    print(i," ".join(f"{w['w']}@{w['start']-s:.2f}" for w in words))
json.dump(out,open(f"{H}/line_words.json","w"),indent=1)
