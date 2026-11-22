# Smart speaker (viral "my smart speaker laughed at 3 a.m." story, twisted: it's been telling something where he sleeps)
L1 = {"t": "Tonight · 3:02 AM · whispered", "q": '"Laugh."'}
NIGHTS = [{"day": "TONIGHT"}, dict(L1), {"day": "FRIDAY"},
  {"t": "3:00 AM · whispered", "q": '"Turn off the hallway camera."'}, {"t": "3:01 AM · whispered", "q": '"Unlock the back door."'}, {"t": "3:04 AM · whispered", "q": '"Where is Daniel?"'},
  {"day": "THURSDAY"}, {"t": "3:00 AM · whispered", "q": '"Turn off the hallway camera."'}, {"t": "3:01 AM · whispered", "q": '"Unlock the back door."'}, {"t": "3:04 AM · whispered", "q": '"Where is Daniel?"'},
  {"day": "WEDNESDAY"}, {"t": "3:00 AM · whispered", "q": '"Turn off the hallway camera."'}]
F = {"cy": 760, "s": 1.0}
PLAN = {"p1": [
 ("spk", {"laugh": True, "fit": F}, ["hum"], "03:00:41 AM", "BEDROOM"),
 ("spk", {"fit": F, "tag": "DANIEL · LIVES ALONE", "tagAt": .1}, ["hum"], "03:00:52 AM", "BEDROOM"),
 ("plan", {"path": ["lounge", "hall", "bed"], "fit": F}, ["rclick2@.25", "rclick2@.55", "rclick2@.8"], "09:14:10 PM", "HOME APP"),
 ("app", {"items": [{"day": "TONIGHT"}, dict(L1, at=.35)], "fit": F}, ["ding@.3"], "07:12:03 AM", "PHONE · SCREEN"),
 ("app", {"items": [{"day": "TONIGHT"}, dict(L1, hl=True, play=True)], "big": "LAUGH.", "bigAt": .05, "fit": F}, ["laugh"], "07:12:10 AM", "PHONE · SCREEN"),
 ("app", {"items": NIGHTS, "scroll": 900, "fit": F}, ["paper"], "07:12:31 AM", "PHONE · SCREEN"),
 ("hallcam", {"off": .45, "fit": F}, ["glitch@.45"], "03:00:02 AM", "HALLWAY CAM"),
 ("backdoor", {"at": .4, "fit": F}, ["lock@.8"], "03:01:10 AM", "BACK DOOR CAM"),
 ("app", {"items": [{"day": "FRIDAY"}, {"t": "3:04 AM · whispered", "q": '"Where is Daniel?"', "hl": True, "play": True}], "big": "WHERE IS DANIEL?", "bigAt": .1, "fit": F}, ["heartbeat"], "07:12:44 AM", "PHONE · SCREEN"),
 ("spk", {"talk": False, "fit": F}, ["ding@.6"], "03:04:05 AM", "BEDROOM"),
 ("spk", {"talk": True, "reply": "Daniel is in the bedroom.", "push": True, "fit": F}, [], "03:04:07 AM", "BEDROOM"),
 ("spk", {"ajar": True, "fit": F, "tag": "IT WAS CHECKING", "tagAt": .5}, ["heartbeat"], "03:02:15 AM", "BEDROOM"),
 ("spk", {"room": "lounge", "reply": "", "fit": F}, ["hum"], "11:48:20 PM", "LOUNGE"),
 ("plan", {"dot": "lounge", "lit": [["hall", .3]], "fit": F, "tag": "NOBODY ELSE HOME", "tagAt": .55}, ["rclick2@.3", "heartbeat"], "03:00:00 AM", "HOME APP"),
 ("plan", {"dot": "lounge", "lit": [["hall", 0], ["lounge", .05]], "spk": "lounge", "fit": F, "tag": "LAMP · ON", "tagAt": .6}, ["rclick2@.05", "rclick2@.6", "heartbeat"], "03:00:31 AM", "HOME APP"),
 ("spk", {"room": "lounge", "reply": "Daniel is in the lounge.", "lamp": True, "hush": True, "push": True, "follow": True, "at": .05, "fit": F}, ["stinger"], "03:00:40 AM", "LOUNGE"),
]}
