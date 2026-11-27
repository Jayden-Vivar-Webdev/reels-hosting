# True case: the Mary Celeste, found adrift near the Azores, Dec 1872. No people shown.
F = {"cy": 760, "s": 1.0}
CAM = "MARY CELESTE · ADRIFT"
PLAN = {"p1": [
 ("mcsea", {"fit": F, "stampTxt": "NOBODY ON BOARD", "stampAt": .55, "tag": "TRUE STORY · 1872", "tagAt": 0}, ["rain", "creak@.3", "hit@.55"], "07:12:00 AM", CAM),
 ("mcsea", {"fit": F, "name": True, "nameAt": .25, "tag": "THE SHIP", "tagAt": 0}, ["rain", "creak@.4"], "07:13:00 AM", CAM),
 ("mcmap", {"fit": F, "routeAt": .05, "routeTo": 1, "label": "10 PEOPLE ABOARD", "labelAt": .72, "tag": "NOV 7, 1872 · NEW YORK", "tagAt": 0}, ["paper@.05"], "09:00:00 AM", "SHIP'S CHART"),
 ("mcsea", {"fit": F, "other": True, "label": "SPOTTED BY THE DEI GRATIA", "labelAt": .55, "labelSize": 58, "tag": "DEC 1872 · NEAR THE AZORES", "tagAt": 0}, ["rain", "creak@.6"], "01:20:00 PM", "DEI GRATIA · LOOKOUT"),
 ("mcdeck", {"fit": F, "hush": True, "label": "NOBODY THERE", "labelAt": .55, "tag": "BOARDING PARTY", "tagAt": 0}, ["creak@.2", "heartbeat@.5"], "02:04:00 PM", "MAIN DECK"),
 ("mccabin", {"fit": F, "checks": [["SEAWORTHY", .05], ["FOOD & WATER ON BOARD", .5]], "tag": "SHIP CHECK", "tagAt": 0}, ["creak@.1", "rclick@.1", "rclick@.5"], "02:10:00 PM", "BELOW DECK"),
 ("mccabin", {"fit": F, "checks": [["BELONGINGS LEFT BEHIND", .15]], "tag": "CREW QUARTERS", "tagAt": 0}, ["rclick@.15"], "02:12:00 PM", "CREW QUARTERS"),
 ("mchold", {"fit": F, "label": "1,700+ BARRELS OF ALCOHOL", "labelAt": .3, "labelSize": 58, "tag": "CARGO HOLD", "tagAt": 0}, ["creak@.2", "hit@.3"], "02:15:00 PM", "CARGO HOLD"),
 ("mcdeck", {"fit": F, "boatGone": True, "boatAt": .3, "label": "LIFEBOAT GONE", "labelAt": .45, "tag": "THE ONLY LIFEBOAT", "tagAt": 0}, ["stinger@.4"], "02:20:00 PM", "MAIN DECK"),
 ("mcinstr", {"fit": F, "stampAt": .4, "tag": "NAVIGATION INSTRUMENTS", "tagAt": 0}, ["hit@.4"], "02:22:00 PM", "CAPTAIN'S CABIN"),
 ("mchold", {"fit": F, "water": True, "label2": "1 PUMP TAKEN APART", "label2At": .05, "label2Y": 470, "label": "3+ FEET OF WATER", "labelAt": .55, "tag": "CARGO HOLD", "tagAt": 0}, ["drip@.1", "drip@.4", "drip@.7"], "02:26:00 PM", "CARGO HOLD"),
 ("mcslate", {"fit": F, "hush": True, "label": "THEN NOTHING", "labelAt": .6, "tag": "LAST LOG ENTRY · NOV 25", "tagAt": 0}, ["paper@.05", "heartbeat@.6"], "02:30:00 PM", "LOG SLATE"),
 ("tbfile", {"fit": F, "big": "NO FOUL PLAY", "bigSize": 120, "bigAt": .3, "big2": "GIBRALTAR COURT · 1873", "big2At": .55, "tag": "OFFICIAL FINDING", "tagAt": 0}, ["paper", "hit@.35"], "10:00:00 AM", "CASE FILE"),
 ("mcsea", {"fit": F, "boat": True, "qs": True, "qsAt": .5, "hush": True, "tag": "10 PEOPLE · 1 SMALL BOAT", "tagAt": 0}, ["rain", "heartbeat@.5"], "05:40:00 PM", CAM),
 ("mcsea", {"fit": F, "night": True, "stampTxt": "NEVER SEEN AGAIN", "stampAt": .35, "stampSize": 80, "tag": "STILL UNSOLVED", "tagAt": 0}, ["rain", "hit@.35"], "11:59:00 PM", CAM),
 ("mcsea", {"fit": F, "night": True, "follow": True, "tag": "MARY CELESTE · TRUE STORY", "tagAt": 0}, ["rain"], "11:59:00 PM", CAM),
]}
