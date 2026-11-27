import json, re
lines=json.load(open("script.json")); st=json.load(open("starts.json")); LW=json.load(open("line_words.json"))
KW={"first","spam","1978","worked","arpanet","government","universities","thousand","work","ads","dec","idea","california","west","coast","hundreds","once","furious","shut","system","never","again","paid","company","monty","python","lesson","yes","australia","law","consent","who","unsubscribe","spammed","follow","internet","stories"}
class _K:
    def search(self,w): return re.search(r"[\d$%]",w) or re.sub(r"[^a-z]","",w.lower()) in KW
KEY=_K()
L=[];chunks=[]
for i,ln in enumerate(lines):
    L.append({"start":round(st["starts"][i],3)})
    times=[(w["start"],w["end"]) for w in LW[i]]; cw=ln["text"].split()
    cur=[];groups=[]
    for j,wd in enumerate(cw):
        cur.append(j)
        if len(cur)==4 or sum(len(cw[x])+1 for x in cur)>=24 or re.search(r"[.,:?!]$",wd): groups.append(cur); cur=[]
    if cur: groups.append(cur)
    m=[]
    for g in groups:
        if m and len(g)==1 and len(m[-1])<5 and sum(len(cw[x])+1 for x in m[-1]+g)<28: m[-1]+=g
        elif m and len(m[-1])==1: m[-1]+=g
        else: m.append(g)
    for g in m:
        chunks.append({"start":times[g[0]][0]-0.05,"words":[{"w":cw[j],"start":times[j][0],"end":times[j][1],"k":bool(KEY.search(cw[j]))} for j in g]})
allw=[w for c in chunks for w in c["words"]]
for a,b in zip(allw,allw[1:]): a["end"]=min(a["end"],b["start"]-0.03)
for a,b in zip(chunks,chunks[1:]): a["end"]=b["start"]-0.25
chunks[-1]["end"]=st["total"]
D={"lines":L,"chunks":chunks,"total":st["total"]}
open("reel_modern.html","w").write(open("scene_modern.html").read().replace("/*DATA*/null",json.dumps(D)))
print(len(chunks),"chunks",st["total"])
