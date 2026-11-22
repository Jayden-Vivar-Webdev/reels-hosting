# Glint (viral "check your Airbnb for hidden cameras" trope, twisted: the camera was watching IT, not him)
M1 = [{"t": "Why did you cover\nthe camera?", "at": -1}]
M2 = M1 + [{"t": "You're watching me??", "me": True, "at": -1}]
PLAN = {"p1": [
 ("room", {"glint": True, "torch": "alarm", "push": True, "tag": "HIDDEN CAMERA", "tagY": 560, "tagAt": .4}, ["hum"], "02:14:07 AM", "PHONE · CABIN"),
 ("listing", {"mode": "top"}, ["hit"], "04:12:40 PM", "PHONE · SCREEN"),
 ("listing", {"mode": "reviews"}, [], "04:13:02 PM", "PHONE · SCREEN"),
 ("rulenote", {}, ["paper"], "06:20:15 PM", "PHONE · KITCHEN"),
 ("room", {"torch": "sweep"}, ["rclick"], "11:58:31 PM", "PHONE · BEDROOM"),
 ("room", {"glint": True, "torch": "alarm", "push": True, "ring": True}, ["heartbeat"], "11:59:10 PM", "PHONE · BEDROOM"),
 ("room", {"tape": True, "torch": "alarm"}, ["paper"], "12:00:02 AM", "PHONE · BEDROOM"),
 ("chat", {"buzz": True, "banner": "Why did you cover the camera?"}, ["buzz"], "12:00:12 AM", "PHONE · SCREEN"),
 ("chat", {"msgs": [dict(M1[0], at=.05)]}, ["hit"], "12:00:14 AM", "PHONE · SCREEN"),
 ("chat", {"msgs": M1 + [{"t": "You're watching me??", "me": True, "at": .3}]}, [], "12:00:31 AM", "PHONE · SCREEN"),
 ("chat", {"msgs": M2 + [{"t": "Not you.\nI was watching IT.", "hl": True, "at": .02}, {"t": "Now I can't see\nwhere it is.", "hl": True, "at": .55}], "push": True}, ["heartbeat"], "12:00:40 AM", "PHONE · SCREEN"),
 ("room", {"tape": True, "torch": "down", "under": True, "underAt": .7}, ["heartbeat"], "12:01:05 AM", "PHONE · BEDROOM"),
 ("room", {"tape": True, "torch": "bed", "under": True, "underAt": 0, "blink": .35, "push": True, "hush": True, "at": .7}, ["stinger"], "12:01:09 AM", "PHONE · UNDER BED"),
 ("cabin", {"tag": "ETHAN RAN"}, ["hit"], "12:01:30 AM", "DOORBELL CAM · CABIN"),
 ("room", {"home": True, "torch": "down", "under": True, "underAt": .72, "push": True, "black": True, "tag": "ETHAN'S HOUSE", "tagY": 560, "tagCol": "#d7fbe9"}, ["heartbeat"], "02:14:07 AM", "PHONE · HOME"),
]}
