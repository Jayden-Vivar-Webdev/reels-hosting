# True case: D.B. Cooper hijacking, Northwest Orient Flight 305 (24 Nov 1971). Silhouettes only.
F = {"cy": 760, "s": 1.0}
CAM = "FLIGHT 305 · CABIN"
PLAN = {"p1": [
 ("dbnote", {"fit": F, "noteAt": .3, "tag": "TRUE STORY · NOV 24, 1971", "tagAt": 0}, ["engine", "paper@.3", "hit@.75"], "02:58:00 PM", CAM),
 ("dbticket", {"fit": F, "tag": "PORTLAND AIRPORT", "tagAt": 0}, ["paper"], "02:20:00 PM", "TICKET COUNTER"),
 ("dbcase", {"fit": F, "hush": True, "tag": "SEAT 18 · LAST ROW", "tagAt": 0}, ["rclick@.15", "heartbeat@.3"], "03:10:00 PM", CAM),
 ("dbdemands", {"fit": F, "tag": "THE NOTE", "tagAt": 0}, ["engine", "hit@.1", "hit@.5"], "03:15:00 PM", CAM),
 ("dbtarmac", {"fit": F, "tag": "SEATTLE AIRPORT", "tagAt": 0}, ["engine", "rain"], "05:45:00 PM", "SEA-TAC · RUNWAY"),
 ("dbsky", {"fit": F, "tag": "BACK IN THE AIR", "tagAt": 0}, ["engine", "wind"], "07:40:00 PM", "FLIGHT 305 · EXTERIOR"),
 ("dbstairs", {"fit": F, "at": .62, "tag": "~8 PM · SW WASHINGTON", "tagAt": 0}, ["engine", "wind", "powerdown@.62"], "08:00:00 PM", "FLIGHT 305 · EXTERIOR"),
 ("dbjump", {"fit": F, "stampAt": .1, "hush": True, "tag": "HE JUMPED", "tagAt": 0}, ["wind", "stinger@.1"], "08:05:00 PM", "FLIGHT 305 · EXTERIOR"),
 ("dbriver", {"fit": F, "tag": "1980 · COLUMBIA RIVER", "tagAt": 0}, ["wind", "dig@.2"], "11:20:00 AM", "RIVERBANK"),
 ("dbserial", {"fit": F, "stampAt": .4, "tag": "FBI LAB", "tagAt": 0}, ["paper", "hit@.4"], "09:00:00 AM", "CASE FILE · 1980"),
 ("dbwanted", {"fit": F, "stampAt": .5, "hush": True}, ["heartbeat@.2", "hit@.5"], "11:59:00 PM", "CASE FILE"),
 ("dbfile", {"fit": F, "stampAt": .6, "tag": "2016", "tagAt": 0}, ["paper", "hit@.6"], "10:00:00 AM", "CASE FILE · NORJAK"),
 ("dbsky", {"fit": F, "follow": True, "tag": "D.B. COOPER · TRUE STORY", "tagAt": 0}, ["wind"], "11:59:00 PM", "FLIGHT 305 · EXTERIOR"),
]}
