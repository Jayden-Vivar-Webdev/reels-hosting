# True case: UNABOM (USA, 1978-1996). Drawn props and featureless silhouettes only.
F = {"cy": 760, "s": 1.0}
CAM = "FBI · UNABOM TASK FORCE"
PLAN = {"p1": [
 ("unparcel", {"fit": F, "big": "17 YEARS", "bigAt": .15, "stampTxt": "CAUGHT BY HIS BROTHER", "stampAt": .62, "tag": "TRUE CRIME · USA", "tagAt": 0}, ["hit@.62"], "09:14:00 AM", CAM),
 ("unparcel", {"fit": F, "campus": True, "tag": "1978 · A CHICAGO UNIVERSITY", "tagAt": 0}, ["hit@.45"], "10:02:00 AM", "CAMPUS · 1978"),
 ("unboard", {"fit": F, "stampTxt": "UNABOM", "stampAt": .72, "tag": "FBI CODE NAME", "tagAt": 0}, ["paper", "hit@.72"], "08:40:00 PM", CAM),
 ("stat", {"fit": F, "to": 16, "label": "BOMBS", "sub": "1978 - 1995", "sub2": "3 PEOPLE KILLED"}, ["heartbeat@.5"], "11:11:00 PM", "CASE FILE"),
 ("unmanu", {"fit": F, "tag": "1995 · AN OFFER", "tagAt": 0}, ["paper"], "02:20:00 PM", "CASE FILE · 1995"),
 ("unmanu", {"fit": F, "count": True, "stampTxt": "PRINT IT, BOMBS STOP", "stampAt": .66, "tag": "THE MANIFESTO", "tagAt": 0}, ["paper", "hit@.66"], "02:21:00 PM", "CASE FILE · 1995"),
 ("unpapers", {"fit": F, "stampTxt": "PUBLISHED", "stampAt": .62, "tag": "SEPTEMBER 1995", "tagAt": 0}, ["paper", "hit@.62"], "06:05:00 AM", "SEPT 19, 1995"),
 ("unreader", {"fit": F, "hlAt": .5, "label": "HIS BROTHER'S WRITING", "labelAt": .6, "hush": True, "tag": "NEW YORK · DAVID", "tagAt": 0}, ["heartbeat@.55"], "07:48:00 PM", "NEW YORK STATE"),
 ("uncabin", {"fit": F, "agents": True, "notes": [["NO ELECTRICITY", .62], ["NO RUNNING WATER", .78]], "tag": "APRIL 1996 · MONTANA", "tagAt": 0}, ["wind", "hit@.62"], "10:15:00 AM", "LINCOLN, MONTANA"),
 ("uninside", {"fit": F, "big": "40,000", "bigAt": .05, "glowAt": .62, "label": "LIVE BOMB · READY TO MAIL", "labelAt": .66, "tag": "INSIDE THE CABIN", "tagAt": 0}, ["paper", "stinger@.64"], "11:02:00 AM", "CABIN · EVIDENCE"),
 ("uninside", {"fit": F, "dim": True, "glowAt": 0, "stampTxt": "NEVER MAILED", "stampAt": .35, "hush": True, "tag": "BECAUSE HIS BROTHER SPOKE UP", "tagAt": .5}, ["hit@.35"], "11:59:00 PM", "CABIN · EVIDENCE"),
 ("uncabin", {"fit": F, "follow": True, "tag": "UNABOM · TRUE STORY", "tagAt": 0}, ["wind"], "11:59:00 PM", "LINCOLN, MONTANA"),
]}
