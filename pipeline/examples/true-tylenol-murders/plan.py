# True case: the Chicago Tylenol murders (1982, unsolved). Drawn props only, no faces, no logos.
F = {"cy": 760, "s": 1.0}
PLAN = {"p1": [
 ("tshelf", {"fit": F, "hl": 7, "back": True, "tag": "TRUE STORY · CHICAGO 1982", "tagAt": 0, "big": "7 DEAD", "bigAt": .1, "bigY": 470}, ["heartbeat"], "09:12:00 AM", "AISLE 4"),
 ("tcity", {"fit": F, "tag": "CHICAGO · SEPTEMBER 1982", "tagAt": 0}, [], "06:40:00 AM", "CHICAGO"),
 ("tbottle", {"fit": F, "caps": True, "label": "DIED THE SAME DAY", "labelAt": .6, "tag": "A POSTAL WORKER", "tagAt": 0}, ["heartbeat"], "07:05:00 AM", "KITCHEN"),
 ("thome", {"fit": F, "people": True, "tag": "HIS BROTHER + SISTER-IN-LAW", "tagAt": 0}, [], "08:30:00 PM", "HIS HOME"),
 ("tbottle", {"fit": F, "glow": True, "caps": True, "label": "THE SAME BOTTLE", "labelAt": .45, "tag": "THEY ASK FOR TYLENOL", "tagAt": 0}, ["heartbeat"], "08:41:00 PM", "KITCHEN"),
 ("thome", {"fit": F, "dark": True, "hush": True, "big": "BOTH DIE", "bigAt": .1, "bigY": 470}, ["stinger@.12"], "11:58:00 PM", "HIS HOME"),
 ("tbottle", {"fit": F, "open": True, "split": True, "splitAt": .2, "word": "CYANIDE", "wordAt": .6, "tag": "INSIDE THE CAPSULES", "tagAt": 0}, ["paper"], "02:14:00 AM", "EVIDENCE"),
 ("tshelf", {"fit": F, "hl": 2, "back": True, "label": "PUT BACK ON THE SHELF", "labelAt": .7, "labelY": 440, "tag": "POLICE BELIEVE", "tagAt": 0}, ["heartbeat"], "09:12:00 AM", "AISLE 4"),
 ("tcount", {"fit": {"cy": 800, "s": 1.0}, "to": 31000000, "label": "BOTTLES PULLED", "sub2": "ACROSS AMERICA", "tag": "NATIONWIDE RECALL", "tagAt": 0}, ["paper"], "10:00:00 AM", "CASE FILE"),
 ("tletter", {"fit": F, "tag": "A LETTER TO THE COMPANY", "tagAt": 0}, ["paper"], "03:40:00 PM", "EVIDENCE"),
 ("dfile", {"fit": F, "head": "THE LETTER WRITER", "rows": [["CONVICTED:", "EXTORTION", "#a01010"], ["SENTENCE:", "PRISON", "#111"]], "stampTxt": "NEVER CHARGED", "stampAt": .62, "stampY": 1000, "stampSize": 96, "tag": "ARRESTED IN NEW YORK", "tagAt": 0}, ["stinger@.64"], "11:20:00 AM", "FBI FILE"),
 ("dfile", {"fit": F, "head": "THE LETTER WRITER", "rows": [["CONVICTED:", "EXTORTION", "#a01010"], ["MURDERS:", "DENIED", "#a01010"], ["DIED:", "2023 · AGE 76", "#111"]], "rowAt": -.12, "tag": "NEVER CHARGED", "tagAt": 0}, ["paper"], "11:21:00 AM", "FBI FILE"),
 ("tunknown", {"fit": F, "hush": True, "tag": "STILL UNSOLVED", "tagAt": 0}, [], "11:59:00 PM", "CASE FILE"),
 ("tseal", {"fit": F, "peelAt": .1, "label": "BECAUSE OF HIM", "labelAt": .7, "labelY": 1200, "tag": "EVERY NEW BOTTLE", "tagAt": 0}, ["paper"], "07:00:00 AM", "YOUR BATHROOM"),
 ("tseal", {"fit": F, "peeled": True, "follow": True, "tag": "THE TYLENOL MURDERS · TRUE STORY", "tagAt": 0}, [], "07:01:00 AM", "YOUR BATHROOM"),
]}
