# True crime: BTK and the floppy disk (owner direction 2026-11-22: real serial-killer story, reveal "this is a true story" + name)
PLAN = {"p1": [
 ("news", {"zoom": True, "ringAt": 1.2}, ["paper"], "02:16:05 AM", "CASE FILE · WICHITA"),
 ("city", {"count": True, "tag": "WICHITA, KANSAS · 1974-1991"}, ["hum"], "11:02:44 PM", "CASE FILE · WICHITA"),
 ("letter", {"seed": 3, "year": "1978", "tag": "LETTERS TO POLICE"}, ["paper"], "09:12:30 AM", "CASE FILE · EVIDENCE"),
 ("years", {"from": 1991, "to": 2004, "label": "SILENCE"}, ["hum"], "12:00:00 AM", "CASE FILE · 13 YEARS"),
 ("letter", {"seed": 9, "year": "2004", "stamp": "HE'S BACK"}, ["paper"], "08:41:17 AM", "CASE FILE · EVIDENCE"),
 ("letter", {"seed": 14, "year": "2004"}, ["heartbeat"], "08:44:02 AM", "CASE FILE · EVIDENCE"),
 ("floppy", {"q": True}, ["heartbeat"], "08:44:30 AM", "CASE FILE · EVIDENCE"),
 ("news", {"ringAt": .6, "tag": "POLICE REPLY"}, ["paper"], "06:30:00 AM", "CASE FILE · NEWSPAPER"),
 ("news", {"zoom": True, "ringAt": .0, "hush": True}, [], "06:30:04 AM", "CASE FILE · NEWSPAPER"),
 ("floppy", {"mail": True, "tag": "FEBRUARY 2005"}, ["slide"], "10:15:22 AM", "CASE FILE · EVIDENCE"),
 ("props", {"hl": [0, 1]}, ["rclick"], "02:47:51 PM", "CASE FILE · FORENSICS"),
 ("church", {}, ["hum"], "07:30:10 PM", "CASE FILE · PARK CITY"),
 ("street", {}, ["heartbeat"], "11:58:40 PM", "CASE FILE · PARK CITY"),
 ("truecard", {"hush": True}, [], "12:00:00 AM", "CASE FILE"),
 ("truecard", {"name": True}, ["stinger"], "12:00:00 AM", "CASE FILE · FEB 25 2005"),
 ("cell", {"black": True}, ["hum"], "12:00:00 AM", "CASE FILE · AUG 2005"),
]}
# v4 layout (owner 2026-11-22: use the full 9:16 frame for Reels + Shorts): per-scene fit = which scene-y is centred in the stage and how much to scale
FIT = {0: {"cy": 765, "s": 1.0}, 3: {"cy": 840, "s": 1.5}, 6: {"cy": 690, "s": 1.18}, 7: {"cy": 765, "s": 1.0}, 8: {"cy": 765, "s": 1.0},
       9: {"cy": 700, "s": 1.12}, 10: {"cy": 700, "s": 1.12}, 11: {"cy": 710, "s": 1.12}, 12: {"cy": 900, "s": 1.04},
       13: {"cy": 700, "s": 1.25}, 14: {"cy": 640, "s": 1.2}, 15: {"cy": 800, "s": 1.15}}
for _i, _f in FIT.items():
    _s = list(PLAN["p1"][_i]); _s[1] = dict(_s[1], fit=_f); PLAN["p1"][_i] = tuple(_s)
