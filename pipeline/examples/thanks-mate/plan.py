# Thanks, mate (camping; the "I heard it too" legend reversed: the brother beside you is the fake)
F = {"cy": 760, "s": 1.0}
MATES = [{"t": "u up mate?", "at": -1}, {"t": "cheers mate", "at": -1}, {"t": "mate. pub?", "at": -1}, {"t": "love ya mate", "at": -1}]
PLAN = {"p1": [
 ("forest", {"fit": F, "tag": "BEN & SAM · CAMPING", "tagAt": .05, "voice": .62}, ["crickets", "wind"], "02:00:14 AM", "TRAIL CAM 2"),
 ("trees", {"fit": F, "text": '"MATE! COME HERE!"', "at": .02}, ["wind", "twig@.1"], "02:00:19 AM", "TRAIL CAM 3"),
 ("chat", {"fit": {"cy": 700, "s": 1.05}, "who": "Ben (brother)", "ini": "B", "icol": "#2f7cf6", "msgs": [dict(m, at=.08 + i*.18) for i, m in enumerate(MATES)]}, ["rclick2@.1", "rclick2@.28", "rclick2@.46", "rclick2@.64"], "11:42:10 PM", "SAM'S PHONE"),
 ("tent", {"fit": F, "reach": True, "grab": .6, "tag": "GRABBED", "wide": True, "zip": 0}, ["zip@.3", "hit@.6"], "02:00:24 AM", "TENT CAM"),
 ("tent", {"fit": F, "wide": True, "scared": True, "shake": True, "tag": "BEN · RIGHT BESIDE ME", "tagAt": .15}, ["breath"], "02:00:28 AM", "TENT CAM"),
 ("benface", {"fit": F, "scared": True, "shake": True, "talk": True}, ["breath"], "02:00:33 AM", "TENT CAM"),
 ("tent", {"fit": F, "dark": True, "wide": True, "scared": True}, ["breath", "heartbeat"], "02:00:41 AM", "TENT CAM"),
 ("tent", {"fit": F, "dark": True, "wide": True, "scared": True, "shadow": [150, 930]}, ["heartbeat", "twig@.4"], "02:01:30 AM", "TENT CAM"),
 ("tent", {"fit": F, "dark": True, "wide": True, "scared": True, "shadow": [640, 660], "press": .3}, ["heartbeat"], "02:01:39 AM", "TENT CAM"),
 ("benface", {"fit": F, "talk": True, "push": True}, ["breath"], "02:01:42 AM", "TENT CAM"),
 ("bigtext", {"fit": {"cy": 940, "s": 1.0}, "text": "SAM.", "hush": True}, [], "02:01:45 AM", "TENT CAM"),
 ("chat", {"fit": {"cy": 700, "s": 1.05}, "who": "Ben (brother)", "ini": "B", "icol": "#2f7cf6", "msgs": [dict(m, hl=True) for m in MATES]}, ["heartbeat"], "11:42:10 PM", "SAM'S PHONE"),
 ("tent", {"fit": F, "dark": True, "wide": True, "noBen": False, "tag": "SILENCE", "tagAt": .3, "tagCol": "#d7fbe9", "hush": True}, [], "02:02:20 AM", "TENT CAM"),
 ("wrist", {"fit": F, "tight": True, "tag": "IT WAS STILL HOLDING ME", "tagAt": .2}, ["breath"], "02:02:31 AM", "TENT CAM"),
 ("benface", {"fit": F, "close": True, "smileAt": .1, "creep": True, "push": True, "hush": True}, ["stinger"], "02:02:35 AM", "TENT CAM"),
 ("benface", {"fit": F, "car": True, "smile": .7, "tag": "NEXT MORNING", "tagAt": .05, "tagCol": "#d7fbe9"}, ["engine"], "08:14:02 AM", "DASHCAM"),
 ("benface", {"fit": F, "car": True, "close": True, "smile": .85, "creep": True, "tag": "HE NEVER BLINKS", "tagAt": .25, "follow": True}, ["engine", "hit@.3"], "08:14:09 AM", "DASHCAM"),
]}
