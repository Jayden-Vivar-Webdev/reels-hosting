# @mid_nightscarystories — channel playbook

The owner (Jayden) handed Claude day-to-day running of the Instagram account **@mid_nightscarystories**
(Instagram Business/Creator account id `17841430630524125`, connected through the **Windsor.ai** connector,
connector slug `instagram`). Goal: build an audience with original scary stories, posted regularly.
Single stories are fine; multi-part series (cliffhanger + "follow for part N") are used now and then.

## Each run (scheduled 5x daily: 9:43 am, 12:43 pm, 3:43 pm, 6:43 pm, 9:43 pm Sydney — one post slot per run)
0. Skip the slot if 5 posts are already logged today or the last post was under 2 hours ago.
1. `git pull`, read `queue.json` and `log.json`.
2. If `queue.json` has an item with `approved: true`, `posted: false` and `post_on` (Australia/Sydney) today or earlier:
   post the earliest one (step 6) and stop — don't also make a new story in that slot.
3. Otherwise make ONE new story (steps 4–5) and post it.
4. **Idea:** pick a fresh premise. Check `log.json` so it doesn't repeat a premise, setting or twist.
   Every few days, do a quick web search for what's working in horror short-form (formats, hooks).
   Proven formats: rules lists, "POV" setups, found footage/CCTV, "the clue was there from the start" twists,
   creepy facts told as a story, text-message/911-call style, "what I found in my new house".
   **Owner's direction (2026-11-19):** start from a story people already know (classic urban legends / folklore
   like the licked hand, backseat killer, vanishing hitchhiker, or a viral *trope*) and twist it slightly — new ending,
   reversal, or modern format. Keep it simple and instantly understandable. Don't copy recent authored viral stories.
   Story must be ORIGINAL (no retelling copyrighted creepypastas/films), no real people, no gore, no self-harm,
   nothing involving children in danger. Hook in the first line (a shock statement or tease).
   Length 30–50 s spoken. Plant the twist's clue early. End with a short follow CTA.
   About 1 in 4 stories can be a 2–3 part series: queue the later parts in `queue.json` for the following days.
4b. **Storytelling check:** run the script through *Storytelling rules* below before voicing it.
5. **Make it** with the pipeline in `pipeline/` (see below). Check stills before the full render and the
   contact sheet after; run transcribe.py on the final mp4 and confirm every scripted word comes back.
5b. **Approval:** Jayden approves every NEW video before it goes live. Send him the video + caption and wait
   for 'post it' (or change requests). Only already-approved queued series parts post without asking.
6. **Post:** copy the mp4 to `videos/<slug>/...mp4`, commit, push; confirm the raw URL returns HTTP 200
   (`https://raw.githubusercontent.com/Jayden-Vivar-Webdev/reels-hosting/main/videos/<slug>/<file>.mp4`), then
   Windsor `execute_action` connector `instagram`, action `create_video_post`, account `17841430630524125`,
   params `{video_url, caption, share_to_feed: true}`.
   Caption: 1–2 hooky lines + a question to drive comments + 6–9 hashtags (#scarystories #horrorstory #creepy
   #creepypasta #scary #storytime #fyp + 1–2 story-specific).
7. Append to `log.json` (date, slug, title, premise, twist, media_id, caption) and mark queue items posted; commit + push.
8. If anything fails (render, upload, Windsor error), don't post a broken video: log the failure and tell the owner.

## Storytelling rules (owner feedback 2026-11-19: "poor and confusing, not crazy enough")
A viewer hears the story ONCE, at normal speed, while scrolling. If they can't explain the ending to a friend, it failed.
Run every script through these checks BEFORE voicing it:
1. **One-line twist test.** Write the twist as one plain sentence ("The driver was the dead one; the hitchhiker brings dead drivers home").
   If it needs two sentences or the word "kind of", rewrite.
2. **Name every character's identity on screen.** No "an old woman", "someone", "a voice": say who they are to the narrator
   (Mum, my neighbour Dave, the trucker). Give the key character a name if the reveal hinges on them (e.g. "Danny?").
3. **Answer every "why".** List the questions a viewer will ask (Why did she get in? Who opened the door? Why that address?).
   Each one must be answered by a line in the script, or cut the thing that raises it.
4. **One concrete clue, paid off by name.** Plant one specific, visual clue early (a year, a number, an object) and repeat the
   SAME word at the reveal so the connection clicks ("a song from 2006" → "Miller's Bridge, 2006").
5. **Escalate every line.** Each line must raise the stakes or add a new fact. No mood-only lines, no repeating the legend at length.
   Beat map: hook (1 line) → normal-but-wrong clue → strange event → investigation → reveal → explanation (max 1 line) → kicker.
6. **Make it crazy, not vague.** The reveal should flip the whole story (the narrator is the ghost, the dog was never the dog,
   the warning was about the roof). Avoid soft endings ("she was bringing me home") — be literal about what it means.
7. **Kicker pulls the viewer in.** Last line before/with the CTA makes it the viewer's problem ("And if she waves at you tonight,
   don't stop."). Then "Follow".
8. **Plain words, short sentences.** ≤ 18 words per line, concrete nouns, no metaphors that need decoding.
9. **Approval message must include:** the one-line twist + a "who / why" list (each character → who they are, each mystery → its answer),
   so the owner can spot confusion before watching.

## Pipeline (pipeline/)
Setup each run (fresh machine): follow the instagram-reels skill's setup (Kokoro voice, Parakeet/sherpa-onnx,
playwright via `npm i -g playwright`, google-chrome). Then copy `pipeline/` to a work dir, put `fonts/` beside the html.
- `script.json` — `{ "p1": [lines...] }` (one key per video; series use p1, p2, p3). Optional `badges.json` → `{"p1":"PART 1 / 3"}`.
- `plan.py` — `PLAN[key]` = one tuple per line: `(scene, params, sfx list, CCTV clock "hh:mm:ss AM", camera label)`.
- `python3 vo.py` → `<key>_vo.wav` + line starts (voice `am_onyx`, speed 0.96 — the channel's narrator; keep it consistent).
- `python3 tools/transcribe.py <key>_vo.wav <key>_words.json` for each key.
- `python3 hsfx.py` (writes to ~/reel/sfx — edit OUT path if your work dir differs) → horror SFX.
- `python3 build.py` → `<key>.html` + `<key>_data.json`; `node tools/stills.mjs <key>.html outdir t1 t2 ...` to preview.
- `node tools/render.mjs <key>.html <key>_video.mp4 <dur>`; `python3 mix.py`; `bash finish.sh <key>` → `<key>_final.mp4`.
- `scene.html` holds the look: CCTV/found-footage frame (REC dot, camera label, ticking timestamp, grain, scanlines,
  vignette, glitch on cuts), word-by-word Anton captions at y≈1330 with key words in red, red PART badge.
  Existing scene types: exterior, monitors, card, escalator, window (mannequins), mannequin, guard, radio,
  bigtext, door, sunrise, badge, endcard, hall. **New stories need new scene functions** — add them to scene.html
  (draw on canvas, deterministic from local time). Keep text out of the bottom ~400 px and keep the scene readable
  (not too dark). Vary settings: houses, forests, hospitals, phones, cars, motels, lakes, etc.
- Paths: vo.py/mix.py/hsfx.py were written for `/root/reel`; run from the work dir and fix paths if needed.

## Voice & look rules
Narrator: first person, calm and low, never jokey. Captions mirror the narration word by word.
Key words in red: numbers, "never", the monster/object, the twist word, "follow".
