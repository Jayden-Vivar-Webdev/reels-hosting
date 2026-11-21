# Lock the Door, Love (doorbell-cam mimic; "let me in" folklore twisted). One entry per script line.
CAM = "FRONT DOOR CAM"
PLAN = {"p1": [
 ("doorcam", {"near": .15, "smile": .3, "tag": "MUM?", "tagAt": .3}, ["doorbell"], "02:04:11 AM", CAM),
 ("call", {"mode": "incoming"}, [], "07:00:02 PM", "LAST SUNDAY"),
 ("call", {"mode": "ended", "quote": True}, ["rclick"], "07:48:40 PM", "LAST SUNDAY"),
 ("doorcam", {"near": .3, "smile": .6}, [], "02:04:20 AM", CAM),
 ("doorcam", {"near": .45, "smile": .6, "talk": True}, ["static"], "02:04:31 AM", CAM),
 ("lockHand", {}, ["lock"], "02:04:38 AM", "HALLWAY"),
 ("texts", {"msgs": [{"t": "Can't sleep love.\nTalk on Sunday? x", "at": .15, "time": "2:04 AM"}], "buzz": True}, ["buzz"], "02:04:44 AM", "MY PHONE"),
 ("doorcam", {"near": .7, "smile": .8, "tag": "SHE STEPPED CLOSER", "tagAt": .1}, ["heartbeat"], "02:04:52 AM", CAM),
 ("doorcam", {"near": 1.0, "smile": 1, "evil": True, "talk": True, "glitch": True, "push": True}, ["heartbeat", "glitch"], "02:04:58 AM", CAM),
 ("doorcam", {"walk": True}, ["static"], "02:05:09 AM", CAM),
 ("doorcam", {"empty": True, "dawn": True, "tag": "4 HOURS LATER", "tagAt": 0}, [], "06:04:30 AM", CAM),
 ("texts", {"msgs": [{"t": "Can't sleep love.\nTalk on Sunday? x", "at": -1, "time": "2:04 AM"}], "banner": "Someone's at my door love", "buzz": True}, ["buzz"], "06:05:02 AM", "MY PHONE"),
 ("texts", {"msgs": [{"t": "Can't sleep love.\nTalk on Sunday? x", "at": -1, "time": "2:04 AM"}, {"t": "Someone's at my door love", "at": .02, "time": "6:05 AM"}, {"t": "It sounds just like you", "at": .42, "hl": True}], "hush": True, "at": 1.55}, ["stinger"], "06:05:09 AM", "MY PHONE"),
 ("call", {"mode": "calling", "count": 20}, ["ringout"], "06:06:40 AM", "MY PHONE"),
 ("drive", {"follow": True}, ["engine"], "06:09:12 AM", "DASHCAM"),
]}
