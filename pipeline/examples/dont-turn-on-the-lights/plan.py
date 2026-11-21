# Don't Turn On the Lights v2 (third person, owner's storyline; ElevenLabs v3). One entry per script line.
J = {"name": "Josh (flatmate)", "init": "J", "col": "#5b7fb3"}
M0 = {"t": "Don't turn on the lights\nwhen you get home.", "at": -1, "time": "2:03 AM"}
ME = {"t": "was that you?", "me": True, "at": -1, "time": "2:14 AM"}
P = "LIAM'S PHONE"
PLAN = {"p1": [
 ("texts", dict(J, msgs=[], banner="New message", buzz=True), ["buzz"], "02:03:12 AM", P),
 ("texts", dict(J, msgs=[dict(M0, at=.02)]), ["rclick"], "02:03:15 AM", P),
 ("lounge", {"tag": "JOSH'S PHONE", "tagAt": .25}, [], "09:14:52 PM", "LOUNGE CAM · EARLIER"),
 ("flatHall", {"glow": True, "closer": True}, ["breath"], "02:10:05 AM", "HALLWAY"),
 ("texts", dict(J, msgs=[M0, dict(ME, at=.12), {"typing": True, "t": "", "at": .65}]), ["rclick"], "02:14:20 AM", P),
 ("texts", dict(J, msgs=[M0, ME, {"t": "Go to sleep.\nI'll be right here.", "at": .03, "hl": True}], buzz=True), ["buzz", "heartbeat"], "02:14:23 AM", P),
 ("peek", {"tag": "EMPTY", "hush": False}, ["breath"], "02:31:40 AM", "LIAM'S ROOM"),
 ("bedroom", {"dark": True, "fever": .6}, ["heartbeat"], "02:33:02 AM", "LIAM'S ROOM"),
 ("bedroom", {"dark": True, "fever": .8, "words": True, "push": True}, ["wh"], "02:33:09 AM", "LIAM'S ROOM"),
 ("bedroom", {"dark": True, "fever": 1, "choke": True, "glitch": True}, ["gasp", "heartbeat"], "02:33:16 AM", "LIAM'S ROOM"),
 ("joshNight", {}, ["door"], "02:33:21 AM", "LIAM'S ROOM"),
 ("joshNight", {"shout": True, "push": True}, [], "02:33:23 AM", "LIAM'S ROOM"),
 ("grab", {"push": True}, ["thump"], "02:33:26 AM", "LIAM'S ROOM"),
 ("bedroom", {"dark": True, "fever": 1, "choke": True, "push": True, "hush": True}, [], "02:33:29 AM", "LIAM'S ROOM"),
 ("possessed", {"hush": True}, [], "02:33:31 AM", "LIAM'S ROOM"),
 ("possessed", {"mouth": True, "glitch": True, "push": True}, ["stinger", "glitch"], "02:33:34 AM", "LIAM'S ROOM"),
 ("flatExt", {"tag": "FLAT 2B"}, [], "11:52:10 PM", "STREET CAM · 3 WEEKS LATER"),
 ("flatExt", {"lease": True, "black": True, "tag": "FLAT 2B"}, [], "11:52:16 PM", "STREET CAM"),
]}
