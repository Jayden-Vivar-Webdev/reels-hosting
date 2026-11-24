# True crime: the Zodiac's 340 cipher (sent Nov 1969, solved Dec 2020) + the unsolved 'My name is' cipher (Z13, Apr 1970).
# Facts: ABC7, CBS SF/AP, History.com (Craig Bauer), ScienceAlert/AFP, A&E Real Crime, zodiacciphers.com (checked 2026-11-24).
F = {"cy": 760, "s": 1.0}
PLAN = {"p1": [
 ("cipher", {"fit": F, "build": True, "ring": .55, "tag": "TRUE STORY · 1969", "tagAt": 0}, ["paper", "stinger@.6"], "11:48:10 PM", "CASE FILE · 1969"),
 ("bayarea", {"fit": F, "tag": "NORTHERN CALIFORNIA · 1968-69", "tagAt": 0}, ["hum", "hit@.3"], "09:00:00 PM", "SF BAY AREA"),
 ("zletter", {"fit": F, "tag": "LETTERS TO THE PAPERS", "tagAt": 0}, ["paper", "hit@.5"], "08:12:00 AM", "CASE FILE · EVIDENCE"),
 ("zstat", {"fit": F}, ["heartbeat"], "12:00:00 AM", "CASE FILE · ZODIAC"),
 ("cipher", {"fit": F, "seed": 341, "env": True, "count": True, "tag": "NOVEMBER 1969", "tagAt": 0}, ["paper", "paper@.15"], "10:15:00 AM", "CASE FILE · Z340"),
 ("cipher", {"fit": F, "seed": 341, "zoom": True, "big": "1969 → 2020", "bigAt": .45, "bigSize": 130}, ["hum", "hit@.5"], "03:00:00 AM", "CASE FILE · Z340"),
 ("trio", {"fit": F, "tag": "DECEMBER 2020", "tagAt": 0}, ["rclick", "rclick@.35", "rclick@.6"], "01:40:00 AM", "CODEBREAKERS · 2020"),
 ("cipher", {"fit": F, "seed": 341, "decode": .02, "stampText": "SOLVED", "stamp": .6}, ["rclick", "hit@.6"], "02:10:00 AM", "CASE FILE · Z340"),
 ("plain", {"fit": F, "lines": ["I HOPE YOU ARE", "HAVING LOTS OF", "FUN IN TRYING", "TO CATCH ME"], "speed": .7}, ["rclick"], "02:11:00 AM", "CASE FILE · Z340"),
 ("plain", {"fit": F, "lines": ["I AM NOT AFRAID OF", "THE GAS CHAMBER", "...", "BECAUSE I NOW", "HAVE ENOUGH SLAVES", "TO WORK FOR ME"], "size": 52, "lh": 92, "speed": .85, "hot": "SLAVES", "hush": True}, ["heartbeat", "stinger@.8"], "02:12:00 AM", "CASE FILE · Z340"),
 ("unknown", {"fit": F, "tag": "IDENTITY: UNKNOWN", "tagAt": .3}, ["hit@.15", "hum"], "12:00:00 AM", "CASE FILE · OPEN"),
 ("myname", {"fit": F, "tag": "APRIL 1970", "tagAt": 0, "hush": True}, ["paper", "heartbeat@.55"], "11:59:00 PM", "CASE FILE · Z13"),
 ("cipher", {"fit": F, "seed": 13, "follow": True, "tag": "THE ZODIAC CIPHERS", "tagAt": 0}, ["hum"], "12:00:00 AM", "CASE FILE · UNSOLVED"),
]}
