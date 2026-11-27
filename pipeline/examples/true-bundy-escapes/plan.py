# True case: Ted Bundy's two escapes from custody, Colorado 1977. Drawn props and empty rooms only, no people or faces.
F = {"cy": 760, "s": 1.0}
J = "GARFIELD COUNTY JAIL"
PLAN = {"p1": [
 ("tbbed", {"fit": F, "revealAt": .66, "label": "A PILE OF BOOKS", "labelAt": .78, "tag": "TRUE CRIME · COLORADO, 1977", "tagAt": 0}, ["heartbeat@.3", "stinger@.68"], "11:48:00 PM", J),
 ("tbfile", {"fit": F, "big": "ESCAPE #1", "bigAt": .05, "tag": "TED BUNDY · CASE FILE", "tagAt": 0}, ["paper", "hit@.1"], "09:00:00 AM", "CASE FILE"),
 ("tblib", {"fit": F, "label": "NO SHACKLES", "labelAt": .7, "tag": "JUNE 1977 · ASPEN, COLORADO", "tagAt": 0}, ["paper@.2"], "10:31:00 AM", "COURTHOUSE · LAW LIBRARY"),
 ("tbwin", {"fit": F, "openAt": .1, "arrow": True, "arrowAt": .5, "tag": "DURING A BREAK", "tagAt": 0}, ["wind", "hit@.55"], "10:42:00 AM", "ASPEN COURTHOUSE"),
 ("tbcar", {"fit": F, "stampTxt": "RECAPTURED", "stampAt": .7, "tag": "6 DAYS LATER", "tagAt": 0}, ["car", "hit@.72"], "02:14:00 AM", "NEAR ASPEN"),
 ("tbceil", {"fit": F, "cutAt": .35, "measure": True, "measureAt": .72, "tag": J, "tagAt": 0}, ["heartbeat@.4"], "01:20:00 AM", "CELL · CEILING"),
 ("tbcrawl", {"fit": F, "lightAt": .5, "label": "JAILER'S APARTMENT", "labelAt": .65, "tag": "DECEMBER 30, 1977", "tagAt": 0}, ["hum"], "09:52:00 PM", "CRAWL SPACE"),
 ("tbdoor", {"fit": F, "openAt": .45, "stampTxt": "WALKED OUT", "stampAt": .72, "tag": "THE FRONT DOOR", "tagAt": 0}, ["door", "wind", "hit@.72"], "10:05:00 PM", "GLENWOOD SPRINGS"),
 ("tbbed", {"fit": F, "clock": "NEXT AFTERNOON", "tag": "NOBODY NOTICED", "tagAt": .1}, ["heartbeat"], "01:40:00 PM", J),
 ("tbhouse", {"fit": F, "hush": True, "stampTxt": "JANUARY 15, 1978", "stampAt": .62, "tag": "TALLAHASSEE, FLORIDA", "tagAt": 0}, ["stinger@.6"], "03:00:00 AM", "FLORIDA · 1978"),
 ("stat", {"fit": {"cy": 620, "s": 1.1}, "to": 30, "label": "CONFESSED MURDERS", "sub": "CAUGHT FEBRUARY 1978"}, ["heartbeat@.3"], "11:11:00 PM", "CASE FILE"),
 ("tbfile", {"fit": F, "hush": True, "big": "?", "bigSize": 200, "bigAt": .35, "big2": "REAL NUMBER: UNKNOWN", "big2At": .6, "tag": "NEVER CONFIRMED", "tagAt": .5}, ["hit@.6"], "11:59:00 PM", "CASE FILE"),
 ("tbbed", {"fit": F, "open": True, "follow": True, "tag": "TED BUNDY · TRUE STORY", "tagAt": 0}, ["hum"], "11:59:00 PM", J),
]}
