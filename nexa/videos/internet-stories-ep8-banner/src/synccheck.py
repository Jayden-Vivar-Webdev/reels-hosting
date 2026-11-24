# python3 synccheck.py line_words.json final.mp4 : caption word times vs what the final mp4 actually says
import json,re,subprocess,sys,os,statistics as st
LW=json.load(open(sys.argv[1])); subprocess.run(["python3",os.path.expanduser("~/tools/transcribe.py"),sys.argv[2],"/tmp/sync.json"],capture_output=True,check=True)
F=json.load(open("/tmp/sync.json")); n=lambda s:re.sub(r"[^a-z0-9]","",s.lower())
cw=[w for l in LW for w in l]; j=0; d=[]
for w in cw:
    for k in range(j,min(j+4,len(F))):
        if n(F[k]["word"])==n(w["w"]): d.append((w["w"],w["start"]-F[k]["start"])); j=k+1; break
v=[x[1] for x in d]; print(f"matched {len(d)}/{len(cw)} words, mean offset {st.mean(v):+.3f}s, worst {max(v,key=abs):+.2f}s")
late=[f"{a}({b:+.2f})" for a,b in d if abs(b)>0.2]; print("off by >0.2s:",late or "none")
sys.exit(1 if abs(st.mean(v))>0.08 or len(late)>3 or len(d)<0.9*len(cw) else 0)
