# True crime: Israel Keyes' buried 'murder kits' (Vermont cache buried 2009, used June 2011; caught Texas March 2012).
# Facts: FBI.gov story + Dallas/Houston releases, AP via WAMC & MPR News, UPI (checked 2026-11-25). No victims named or shown.
F = {"cy": 760, "s": 1.0}
PLAN = {"p1": [
 ("kbucket", {"fit": F, "fill": True, "tag": "TRUE STORY · VERMONT · 2009", "tagAt": 0, "big": "2 YEARS LATER", "bigAt": .72}, ["wind", "dig@.2", "hit@.72"], "11:48:10 PM", "CASE FILE · 2009"),
 ("kcontents", {"fit": F, "tag": "INSIDE THE BUCKET", "tagAt": 0}, ["paper", "hit@.12"], "11:52:00 PM", "EVIDENCE · VT"),
 ("truecard", {"fit": F, "name": True, "n1": "ISRAEL KEYES", "n1size": 120, "n2": "MURDER|KITS", "n2size": 200, "when": "FBI CASE FILE"}, ["hit@.5", "heartbeat"], "12:00:00 AM", "CASE FILE · FBI"),
 ("kmap", {"fit": F, "mode": "kits", "tag": "HIDDEN ACROSS THE U.S.", "tagAt": 0}, ["rclick", "rclick@.3", "rclick@.55"], "02:14:00 AM", "CASE FILE · KITS"),
 ("kmap", {"fit": F, "mode": "route", "tag": "JUNE 2011", "tagAt": 0}, ["hum", "car@.55"], "09:30:00 PM", "CASE FILE · 2011"),
 ("khouse", {"fit": F, "tag": "ESSEX, VERMONT", "tagAt": 0}, ["wind", "heartbeat@.6"], "01:12:00 AM", "VERMONT · 2011"),
 ("kdig", {"fit": F, "tag": "BURIED 2009 · USED 2011", "tagAt": .2, "hush": True}, ["dig@.1", "stinger@.82"], "01:40:00 AM", "VERMONT · 2011"),
 ("kcard", {"fit": F, "tag": "CAUGHT", "tagAt": 0}, ["rclick", "rclick@.2", "hit@.62"], "04:20:00 PM", "TEXAS · 2012"),
 ("stat", {"fit": F, "to": 11, "label": "VICTIMS", "sub": "FBI BELIEVES"}, ["heartbeat"], "12:00:00 AM", "CASE FILE · FBI"),
 ("kfiles", {"fit": F}, ["paper", "hit@.55"], "12:00:00 AM", "CASE FILE · OPEN"),
 ("kmap", {"fit": F, "mode": "end", "hush": True}, ["hum"], "11:59:00 PM", "CASE FILE · OPEN"),
 ("kmap", {"fit": F, "mode": "end", "follow": True, "tag": "ISRAEL KEYES · TRUE STORY", "tagAt": 0}, ["hum"], "12:00:00 AM", "CASE FILE · OPEN"),
]}
