# Don't Turn On the Lights (flatmate texts; "aren't you glad you didn't turn on the light" legend, twisted). One entry per script line.
J = {"name": "Josh (flatmate)", "init": "J", "col": "#5b7fb3"}
M0 = {"t": "Don't turn on the lights\nwhen you get home.", "at": -1, "time": "2:03 AM"}
PLAN = {"p1": [
 ("texts", dict(J, msgs=[dict(M0, at=.12)], buzz=True), ["buzz"], "02:03:12 AM", "MY PHONE"),
 ("lounge", {"tag": "JOSH'S PHONE", "tagAt": .25, "tagX": 470, "tagY": 930}, [], "09:14:52 PM", "LOUNGE CAM · EARLIER"),
 ("lightSwitch", {}, ["lock"], "02:09:40 AM", "FRONT HALL"),
 ("flatHall", {"glow": True}, ["breath"], "02:10:05 AM", "HALLWAY"),
 ("flatHall", {"glow": True, "closer": True, "push": True, "hush": True}, [], "02:10:16 AM", "HALLWAY"),
 ("texts", dict(J, msgs=[M0, {"t": "was that you?", "me": True, "at": .15, "time": "2:14 AM"}, {"typing": True, "t": "", "at": .7}]), ["rclick"], "02:14:20 AM", "MY PHONE"),
 ("texts", dict(J, msgs=[M0, {"t": "was that you?", "me": True, "at": -1, "time": "2:14 AM"}, {"t": "Go to sleep.\nI'll be right here.", "at": .05, "hl": True}], buzz=True), ["buzz", "heartbeat"], "02:14:23 AM", "MY PHONE"),
 ("josh", {"yawn": True}, [], "07:42:10 AM", "HALLWAY"),
 ("josh", {"pale": True, "push": True}, [], "07:42:31 AM", "HALLWAY"),
 ("lounge", {"morning": True, "dent": True, "tag": "STILL WARM", "tagAt": .55, "tagX": 772, "tagY": 900, "tagCol": "#ff5a3a", "push": True}, ["heartbeat"], "07:43:02 AM", "LOUNGE CAM"),
 ("texts", dict(J, msgs=[], banner="New message", buzz=True), ["buzz"], "02:00:41 AM", "MY PHONE · LAST NIGHT"),
 ("texts", dict(J, msgs=[{"t": "Don't turn on the light.\nI'm in your room now.", "at": .08, "hl": True, "time": "2:01 AM"}], hush=True, at=0.6), ["stinger"], "02:01:02 AM", "MY PHONE"),
 ("covers", {"follow": True}, ["breath"], "02:01:30 AM", "UNDER THE COVERS"),
]}
