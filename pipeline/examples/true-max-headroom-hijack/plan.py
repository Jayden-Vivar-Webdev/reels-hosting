# True mystery: the Max Headroom signal hijacking, Chicago, Nov 22 1987. Facts: WTTW (2017), Chicago Sun-Times (2014), Mental Floss (2015), Wikipedia (checked 2026-11-23).
F = {"cy": 760, "s": 1.0}
PLAN = {"p1": [
 ("crt", {"fit": F, "mode": "mask", "tag": "CHICAGO · 1987", "tagAt": .02, "tag2": "NEVER CAUGHT", "tag2At": .75}, ["stinger@.7"], "09:14:02 PM", "CASE FILE · 1987"),
 ("crt", {"fit": F, "mode": "news", "mode2": "black", "at": .82, "tag": "NOV 22 · SUNDAY · 9 PM", "tagAt": .02}, ["hum", "powerdown@.8"], "09:14:20 PM", "CH 9 · LIVE"),
 ("crt", {"fit": F, "mode": "mask", "buzz": True, "tag": "NO VOICE", "tagAt": .3}, ["buzz", "glitch@.05"], "09:14:31 PM", "CH 9 · LIVE"),
 ("control", {"fit": F, "cut": .3, "tag": "SIGNAL CUT", "tagAt": .25, "tag2": "\"SO AM I.\"", "tag2At": .75}, ["rclick@.3", "hum"], "09:14:58 PM", "MASTER CONTROL"),
 ("crt", {"fit": F, "mode": "lighthouse", "tag": "11:15 PM · CHANNEL 11", "tagAt": .02}, ["hum"], "11:15:04 PM", "CH 11 · LIVE"),
 ("crt", {"fit": F, "mode": "static", "mode2": "mask", "at": .35, "glitch": True, "hush": True}, ["static@.12", "stinger@.4"], "11:15:12 PM", "CH 11 · LIVE"),
 ("crt", {"fit": F, "mode": "mask", "sound": True, "big": True, "zoom": True, "tag": "≈ 90 SECONDS", "tagAt": .55}, ["radio"], "11:15:40 PM", "CH 11 · LIVE"),
 ("crt", {"fit": F, "mode": "mask", "mode2": "static", "at": .45, "tag": "IT STOPPED ON ITS OWN", "tagAt": .5, "hush": True}, ["static@.45"], "11:16:41 PM", "CH 11 · LIVE"),
 ("skyline", {"fit": F, "tag": "FCC + FBI INVESTIGATE", "tagAt": .05, "tag2": "SOURCE: UNKNOWN", "tag2At": .5}, ["paper@.1", "hit@.5"], "12:00:00 AM", "CASE FILE · 1987"),
 ("crt", {"fit": F, "mode": "mask", "tag": "NEVER IDENTIFIED", "tagAt": .05, "tagCol": "#ff5a3a", "hush": True}, ["heartbeat"], "11:16:58 PM", "CASE FILE · UNSOLVED"),
 ("crt", {"fit": F, "mode": "black", "follow": True, "tag": "STILL UNSOLVED", "tagAt": .05}, ["hum"], "11:17:10 PM", "CASE FILE · UNSOLVED"),
]}
