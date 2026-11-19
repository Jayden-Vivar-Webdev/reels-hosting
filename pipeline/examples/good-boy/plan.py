MSG = [{"t": "Found your dog in my yard.", "at": 0.3}, {"photo": True, "at": 1.4}, {"t": "He's soaked. I'll bring\nhim back in the morning.", "at": 2.4}]
PLAN = {"p1": [
 ("bedroom", {"dog": True, "lamp": True}, ["hit"], "10:41:12 PM", "PET CAM · BEDROOM"),
 ("laundry", {}, ["static"], "09:13:40 PM", "PET CAM · LAUNDRY"),
 ("bedroom", {"hand": True, "lick": True, "lamp": True}, [], "10:58:03 PM", "PET CAM · BEDROOM"),
 ("bedroom", {"hand": True, "zzz": True}, [], "11:02:47 PM", "PET CAM · BEDROOM"),
 ("storm", {}, ["hit", "powerdown"], "01:56:20 AM", "PET CAM · BEDROOM"),
 ("bedroom", {"hand": True, "dark": True, "storm": True}, ["heartbeat"], "02:11:09 AM", "PET CAM · BEDROOM"),
 ("bedroom", {"hand": True, "lick": True, "dark": True, "storm": True}, [], "02:11:31 AM", "PET CAM · BEDROOM"),
 ("bedroom", {"hand": True, "lick": True, "dark": True, "zzz": True}, [], "02:12:05 AM", "PET CAM · BEDROOM"),
 ("bedroom", {"hand": True, "dark": True, "phoneGlow": True}, ["rclick"], "03:07:11 AM", "PET CAM · BEDROOM"),
 ("phone", {"msgs": MSG}, ["hit"], "03:07:14 AM", "PHONE"),
 ("bedroom", {"hand": True, "lick": True, "dark": True, "eyes": True, "eyesAt": 1.2, "push": True}, ["heartbeat"], "03:07:40 AM", "PET CAM · BEDROOM"),
 ("bigtext", {"text": "GOOD BOY.", "hand": True, "at": 1.33}, ["stinger"], "03:07:44 AM", "PET CAM · BEDROOM"),
 ("endcard", {"next": "END", "follow": True}, ["swell"], "", "SIGNAL LOST"),
]}
