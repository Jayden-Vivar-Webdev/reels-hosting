# Red Peephole (motel; the red-eye-in-the-peephole legend, but it follows him)
F = {"cy": 760, "s": 1.0}
PE = {"cy": 740, "s": 1.12}
PLAN = {"p1": [
 ("peep", {"fit": PE, "flick": True, "every": 1.6, "off": .2, "tag": "ROOM 6 · PEEPHOLE", "tagAt": .05}, ["hum"], "01:12:40 AM", "ROOM 6"),
 ("peep", {"fit": PE, "flick": True, "every": 1.25, "off": .7, "tag": "FLICKERING?", "tagAt": .55}, ["hum"], "01:12:46 AM", "ROOM 6"),
 ("motel", {"fit": F, "tag": "MARCUS · TRUCK DRIVER", "tagAt": .05}, [], "11:48:03 PM", "LOT CAM"),
 ("mroom", {"fit": F, "knocks": [.32, .52, .72], "scared": True, "tag": "2:00 AM", "tagAt": .02}, ["knock@.32", "knock@.52", "knock@.72", "hum"], "02:00:02 AM", "ROOM 6"),
 ("mroom", {"fit": F, "gap": True, "scared": True, "tag": "\"ROOM SERVICE.\"", "tagAt": .1}, ["hum"], "02:00:09 AM", "ROOM 6"),
 ("mroom", {"fit": F, "gap": True, "scared": True, "shake": True}, ["breath"], "02:00:12 AM", "ROOM 6"),
 ("mroom", {"fit": {"cy": 760, "s": 1.25}, "gap": True, "scared": True, "shake": True, "push": True}, ["heartbeat"], "02:00:16 AM", "ROOM 6"),
 ("peep", {"fit": PE, "flick": True, "every": 1.1, "off": .5, "hush": True, "tag": "HE KNEW MY NAME", "tagAt": .3}, [], "02:00:19 AM", "ROOM 6"),
 ("desk", {"fit": F, "tag": "CHECKOUT · FRANK", "tagAt": .05}, ["ding@.05"], "07:31:10 AM", "OFFICE CAM"),
 ("desk", {"fit": {"cy": 700, "s": 1.25}, "pale": True, "talk": True, "push": True}, [], "07:31:17 AM", "OFFICE CAM"),
 ("desk", {"fit": F, "keys": True, "note": True, "hlAt": .15}, [], "07:31:21 AM", "OFFICE CAM"),
 ("bigtext", {"fit": {"cy": 940, "s": 1.0}, "hand": True, "text": "IT WASN'T|A LIGHT.", "hush": True}, [], "07:31:26 AM", "OFFICE CAM"),
 ("peep", {"fit": PE, "mode": "eye", "push": True}, ["stinger"], "02:00:24 AM", "ROOM 6"),
 ("motel", {"fit": F, "name": "LONE PINE INN", "tag": "3 WEEKS LATER", "tagAt": .05}, [], "01:58:44 AM", "LOT CAM"),
 ("mroom", {"fit": F, "knocks": [.3, .5, .7], "scared": True, "dark": True, "tag": "LAST NIGHT", "tagAt": .02, "num": "11"}, ["knock@.3", "knock@.5", "knock@.7"], "02:00:01 AM", "ROOM 11"),
 ("mroom", {"fit": {"cy": 720, "s": 1.15}, "num": "11", "dark": True, "redDot": True, "scared": True, "follow": True, "hush": True}, ["hum"], "02:00:07 AM", "ROOM 11"),
]}
