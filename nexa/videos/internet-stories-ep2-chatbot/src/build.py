import json, os, re
H="/root/ep2b"
lines=json.load(open(f"{H}/script.json")); st=json.load(open(f"{H}/starts.json")); words=json.load(open(f"{H}/vo_words.json"))
KEY=re.compile(r"[\d$%]|^(deal|Tahoe|AI|business|Follow|rules|pay|wrong|viral|never|funny)\b",re.I)
L=[];chunks=[]
for i,ln in enumerate(lines):
    s=st["starts"][i]; e=st["starts"][i+1] if i+1<len(lines) else st["total"]
    L.append({"start":round(s,3)})
    tw=[w for w in words if s-0.1<=w["start"]<e-0.05]
    cw=ln["text"].split()
    if len(tw)==len(cw): times=[(w["start"],w["end"]) for w in tw]
    else:
        a=tw[0]["start"] if tw else s; b=tw[-1]["end"] if tw else e-0.3
        lens=[len(x)+2 for x in cw]; tot=sum(lens); acc=0; times=[]
        for l in lens: times.append((a+(b-a)*acc/tot, a+(b-a)*(acc+l)/tot)); acc+=l
    # chunk: up to 4 words, break after punctuation, no single orphan
    cur=[]; groups=[]
    for j,wd in enumerate(cw):
        cur.append(j)
        if len(cur)==4 or re.search(r"[.,:?!]$",wd): groups.append(cur); cur=[]
    if cur: groups.append(cur)
    m=[]
    for g in groups:
        if m and len(g)==1 and len(m[-1])<5: m[-1]+=g
        elif m and len(m[-1])==1: m[-1]+=g
        else: m.append(g)
    for g in m:
        chunks.append({"start":times[g[0]][0]-0.05,"words":[{"w":cw[j],"start":times[j][0],"end":times[j][1],"k":bool(KEY.search(cw[j]))} for j in g]})
# Internet Stories in lime too
for c in chunks:
    for w in c["words"]:
        if w["w"].startswith(("Internet","Stories")): w["k"]=True
allw=[w for c in chunks for w in c["words"]]
for a,b in zip(allw,allw[1:]): a["end"]=min(a["end"],b["start"]-0.03)
for a,b in zip(chunks,chunks[1:]): a["end"]=b["start"]-0.25
chunks[-1]["end"]=st["total"]
D={"lines":L,"chunks":chunks,"total":st["total"]}
h=open(f"{H}/scene.html").read().replace("/*DATA*/null",json.dumps(D))
open(f"{H}/reel.html","w").write(h); print(len(chunks),"chunks",st["total"])
