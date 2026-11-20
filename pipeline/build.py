import json, re, sys
from plan import PLAN
S = json.load(open("script.json"))
KEY = {"agnes","agnes's","forty","candle","second","voice","clare","clare,","locked","face.","face","smiling.","listening.","backwards.","back","pew","empty.","3","never","alone.","inside","again.","help","hospital.","night","shift","mirror.","mirrors","imagination.","flickering.","stopped.","behind","saw","save","say?","nothing.","nobody","ran.","moving","stairs","woman","answered.","biscuits","nothing.","emma's","her?","waiting.","neighbours.","fills","someone","will.","inside.","wall.","open.","sleep.","elevator","full.","suit","pink","gown.","gown","gap","gap,","room","room.","hale","14b","sunday.","empty.","nobody.","fuller.","3","stairs.","smiled","smiled.","coming","up.","pale.","won't","driver","mirror,","mirror.","closer.","behind","around.","months","crying","mirror,","whisper...","stop","flowers","flowers.","card.","name","okay?","dashcam.","pouring","danny?","mum's","mum","photo","2006","2006.","station","note","drivers","stop.","wet","bridge.","bridge","white","vanishes","vanishes.","radio","song","puddle","knocked","knocks","past","ribbon","twenty","face","face.","home","home.","seat","truck","roof","thumped","branch","flash","empty","nobody","sunroof","white","trucker","max","storm","laundry","licks","licked","alone","slowly","neighbour","dog","soaked","again","good","boy","boy.","whispered","hands","four","three","2","window","windows","door","once","twice","locked","lights","light","my","inside","hollow","shadow","fourth","moved","never","three","eleven","mannequins","mannequin","double","scratched","facing","breathing","gone","behind","count","twelve","thirteen","empty","follow","two","five","3","9","alone","shut","dead"}
BADGE = json.load(open("badges.json")) if __import__("os").path.exists("badges.json") else {}

def tokens(line):
    line = line.replace("a.m.", "AM")
    return [w for w in re.findall(r"[A-Za-z0-9'\-]+[.,!?…]*|\.\.\.", line) if w != "..."]

for p in S:
    L = json.load(open(f"{p}_lines.json")); asr = json.load(open(f"{p}_words.json"))
    starts, dur = L["starts"], L["dur"]
    scenes, caps = [], []
    for i, line in enumerate(S[p]):
        st = starts[i]; en = starts[i+1] if i+1 < len(starts) else dur
        scene, prm, sfx, clock, cam = PLAN[p][i]
        m = re.match(r"(\d\d:\d\d):\d\d (AM|PM)", clock)
        if m and scene == "monitors": prm = dict(prm, clk=f"{m.group(1)} {m.group(2)}")
        scenes.append({"start": round(max(st - 0.08, 0) if i else 0, 3), "end": round(en - 0.08 if i+1 < len(starts) else dur, 3),
                       "scene": scene, "p": prm, "sfx": sfx, "clock": clock, "cam": cam})
        ws = [a for a in asr if st - 0.05 <= a["start"] < en - 0.05]
        tk = tokens(line)
        # map script tokens onto ASR timings proportionally
        times = []
        for j in range(len(tk)):
            if ws:
                k = min(int(j * len(ws) / len(tk)), len(ws) - 1); times.append(ws[k]["start"])
            else:
                times.append(st + j * 0.3)
        times = [max(times[j], times[j-1] + 0.05) if j else times[j] for j in range(len(times))]
        line_end = (ws[-1]["end"] if ws else st + 0.3 * len(tk)) + 0.25
        # chunks of up to 3 words, break after punctuation
        chunk = []
        def flush(end):
            if chunk:
                caps.append({"start": chunk[0]["s"], "end": round(end, 3), "words": list(chunk)}); chunk.clear()
        for j, w in enumerate(tk):
            clean = re.sub(r"[^A-Za-z0-9']", "", w).lower()
            chunk.append({"w": w.rstrip(",") , "s": round(times[j], 3), "key": clean in KEY})
            nxt = times[j+1] if j+1 < len(tk) else line_end
            last = j + 1 == len(tk)
            remaining = len(tk) - j - 1
            if last or (len(chunk) >= 3 and remaining != 1) or (w[-1] in ".,?!" and remaining != 1 and len(chunk) >= 1 and remaining > 0):
                flush(min(nxt, line_end) if not last else min(en, line_end + 0.4))
    # make captions continuous within a line gap
    for a, b in zip(caps, caps[1:]):
        if b["start"] - a["end"] < 0.15: a["end"] = b["start"]
    data = {"badge": BADGE.get(p, ""), "scenes": scenes, "caps": caps, "dur": dur}
    json.dump(data, open(f"{p}_data.json", "w"))
    html = open("scene.html").read().replace("<script>\nconst D", f"<script>window.DATA={json.dumps(data)};</script>\n<script>\nconst D", 1)
    open(f"{p}.html", "w").write(html)
    print(p, len(scenes), "scenes", len(caps), "captions", round(dur, 1), "s")
