# Room for One More v2 (ending-first rewrite). One entry per script line.
PLAN = {"p1": [
 ("elevator", {"opening": True, "turn": 0, "noLady": True}, ["ding", "hum"], "03:00:00 AM", "CAM 14 · SAT"),
 ("elevator", {"noLady": True, "turnAt": 0.12, "push": True}, ["hum"], "03:00:06 AM", "CAM 14 · SAT"),
 ("suit", {"push": True}, ["hum"], "03:00:09 AM", "CAM 14 · SAT"),
 ("elevator", {"noLady": True, "gapHL": True}, ["hum"], "03:00:11 AM", "CAM 14 · SAT"),
 ("elevator", {"noLady": True, "closeAt": 0.05}, ["hum", "door"], "03:00:15 AM", "CAM 14 · SAT"),
 ("suit", {"at": 0.35}, [], "03:00:17 AM", "CAM 14 · SAT"),
 ("doorstep", {}, ["paper"], "08:02:41 AM", "CAM 14 · SUN"),
 ("notice", {"push": True, "line": "Died in her sleep · Sat 3:00 AM"}, [], "04:18:09 PM", "LOBBY · SUN"),
 ("elevator", {"ladyInGap": True, "noLady": True, "push": True}, ["ding", "hum", "heartbeat"], "03:00:00 AM", "CAM 14 · SUN"),
 ("elevator", {"gap": False, "label": "5 NIGHTS · 5 NEIGHBOURS"}, ["hum", "static"], "03:00:00 AM", "CAM 14 · THU"),
 ("emma", {"hush": True}, [], "03:00:04 AM", "CAM 14 · TONIGHT"),
 ("suit", {"wide": True, "push": True, "hush": True}, ["stinger"], "03:00:12 AM", "CAM 14 · TONIGHT"),
 ("elevator", {"noLady": True, "gapHL": True, "follow": True}, ["hum"], "03:00:19 AM", "CAM 14 · TONIGHT"),
]}
