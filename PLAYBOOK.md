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
4b. **Story engine:** build the story with *Story engine* below (ending first, clue map, beat sheet), then pass the
   critique gate (every score ≥ 4) BEFORE voicing it or making visuals. Rewrite weak sections; don't polish a weak story.
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

## Story engine (owner brief 2026-11-20: psychological horror, suspense, curiosity, emotional impact, memorable twists)
The story must be frightening and memorable, not just look good. A viewer hears it ONCE while scrolling: if they
can't explain the ending to a friend, it failed. If they don't feel sick about the ending, it also failed.

### A. Build order (do these in order, in writing, before any visuals)
1. **Ending first.** Write the final reveal and the final image/line before anything else.
   - **One-line twist test:** the twist as one plain sentence ("Every time he refuses the elevator, someone in his
     building dies in his place, and tonight it's offering his girlfriend"). Needs two sentences or "kind of"? Rewrite.
   - The twist must **change how the earlier events read** (a recontextualisation), not just add a monster.
     Best twists, in order: the narrator's own choice caused it · a safe/comforting thing was the danger ·
     an innocent early line meant something else all along · the threat moves to someone he loves.
2. **Clue map.** Plant 1–2 fair clues in the first 40%, each innocent the first time you hear it
   ("That's alright. Someone will."). Repay each one by repeating the SAME word/object at the reveal so it clicks.
   A rewatch should make the viewer go "oh no, it was right there."
3. **Emotional stake.** By ~10 s the viewer must know who could get hurt and care about them, through one small
   human detail (she leaves biscuits at my door every Sunday), not a description. The scariest endings threaten
   that person or force the narrator into an impossible choice.
4. **Beat sheet (30–50 s, ~120–130 spoken words at Kokoro 0.96):**
   - 0–2 s **Hook:** a disturbing image or a wrong detail in the first sentence ("packed with people, all facing the
     wall"). No "let me tell you", no throat-clearing, no "this happened to me".
   - **Normal-but-wrong → strange event → clue line.**
   - **Escalation:** believable discoveries, each line adds a new fact or raises the stakes. No mood-only lines.
   - **Reveal at ~70–80 %**, then max ONE line of explanation.
   - **Kicker:** still happening, getting closer, personal ("The doors are still open. He's waiting.").
     Owner prefers endings that stay unresolved and threatening over one-off reveals.
5. **Write the beats into lines** using the clarity rules (section C).

### B. Critique gate (mandatory before voicing, and write it into the approval message)
Score each 1–5 honestly. Anything under 4 → rewrite that part and re-score. Don't voice a script that hasn't passed.
| Check | 5 looks like |
|---|---|
| Hook | first sentence alone would stop a scroll |
| Originality | not a straight retelling; the twist isn't the first one a viewer would guess |
| Suspense | each line raises a question or the stakes; nothing static |
| Logic | every "why?" a viewer will ask has an answer in the script (list them and answer them) |
| Emotional impact | someone we care about is at risk, or the narrator is guilty |
| Twist | unexpected but fair, and changes the meaning of an earlier line |
| Memorability | one line/image people would quote in the comments |
Also do a **cut pass:** delete any line that's only exposition, recap or atmosphere. Read it aloud at ~2.7 words/s.

### C. Clarity rules (owner feedback 2026-11-19: "poor and confusing, not crazy enough")
1. **Name every character's identity** (Mrs Hale from 14B, my girlfriend Emma, Frank the concierge). No "someone", "a voice".
2. **Answer every "why"** in the script, or cut the thing that raises it. Timeline must be consistent (no "every night" then "the first night").
3. **Plain words, short sentences.** ≤ 18 words per line, concrete nouns, no metaphors that need decoding.
4. **Talk like a real person:** casual first person, real dialogue and small reactions ("I said, no thanks..."). Not legend recaps.
   Another character's spoken line uses a second Kokoro voice (voices.json, e.g. bm_george, af_nicole); narrator stays am_onyx.
5. **Make it crazy, not vague.** Be literal about what the ending means; no soft endings.
6. **Recent and personal timelines** ("five nights ago", "two months ago", not "twenty years ago").
7. **Start from a story people already know** (urban legend / folklore / viral trope) and twist it: new ending, reversal or
   modern format (owner direction 2026-11-19). Never copy recent authored creepypastas.

### D. Banned clichés and cheap moves
"It was all a dream" · "I was dead all along" (unless airtight and set up) · the call coming from inside the house ·
unexplained random demon or "shadow figure" · "I felt a chill" / "something felt off" / "little did I know" · flickering
lights or a cracking mirror as the only scary event · jump scares with no story meaning · Ouija boards ·
a monster that's never connected to the narrator · endings that explain everything away.

### E. Psychological horror toolkit (use 1–2 per story)
Wrongness in the familiar (a neighbour, a routine, a home) · implication over showing (we never see what's in the gap) ·
a rule with a cost · guilt (his choice caused it) · an impossible choice · the viewer realising before the narrator ·
a polite, calm threat (calm voices are scarier than screams).

### F. Pacing, silence and sound
- **Silence is the scariest sound.** Before the key line, cut the drone and room tone for ~0.6 s (`"hush": true` scene param),
  then land the line in near-silence.
- **Pauses:** a longer gap after the clue line and before the final line (`pauses.json`, e.g. `{"p1": {"5": 1.0}}` = 1 s after line 5).
- **One sting per story,** on the reveal only. No stingers on every cut; small diegetic sounds instead (a ding, a door, a hum).
- End on room tone or the diegetic sound (the elevator's open-door hum), not a swell.
- Visuals: imply, don't show. One clear image per line, changing every 2–5 s.

### G. Approval message must include
The one-line twist, the critique scores, a who/why list (each character → who they are, each mystery → its answer), the clue(s)
and where they pay off, the caption, and the video.

### H. Owner's taste (2026-11-20, rejected the ending-first "Room for One More" v2 as "horrible")
He wants **grounded, personal, "this happened to me" stories**, told like a real person recounting a scary night:
- Set up the narrator's **real routine first** (job, time of day, the walk he always does: "I work night shift at the hospital,
  every morning I take the elevator down alone") so the viewer can picture themselves there.
- Build **slow, relatable unease** (dark hallways, mirrors, "it always felt like someone was in there with me", "I blamed my imagination")
  before the event. Flickering lights / a stalled elevator are fine in this personal context.
- The scare is a **direct, personal encounter** (a voice that knows what he saw, "I'm right behind you"), then a "nothing was there" beat.
- End on the **lasting real-life effect** ("I haven't used it since. I'm moving out. Even the stairs scare me now.").
- He prefers this over clever moral-dilemma or supernatural-rule twists. Section D's cliché bans are guidance, not hard rules,
  when they fit this grounded style. When he gives a storyline, keep every beat he wrote; only tighten wording.

## Pipeline (pipeline/)
Setup each run (fresh machine): follow the instagram-reels skill's setup (Kokoro voice, Parakeet/sherpa-onnx,
playwright via `npm i -g playwright`, google-chrome). Then copy `pipeline/` to a work dir, put `fonts/` beside the html.
- `script.json` — `{ "p1": [lines...] }` (one key per video; series use p1, p2, p3). Optional `badges.json` → `{"p1":"PART 1 / 3"}`.
- `plan.py` — `PLAN[key]` = one tuple per line: `(scene, params, sfx list, CCTV clock "hh:mm:ss AM", camera label)`.
- `python3 vo.py` → `<key>_vo.wav` + line starts (voice `am_onyx`, speed 0.96 — the channel's narrator; keep it consistent).
  Optional `pauses.json` (`{"p1": {"5": 1.0}}`) sets the silence after a line. A scene param `"hush": true` makes mix.py drop the
  drone/beds to silence for that scene (and 0.4 s before it) for the dread beat.
- `python3 tools/transcribe.py <key>_vo.wav <key>_words.json` for each key.
- `python3 hsfx.py` (writes to ~/reel/sfx — edit OUT path if your work dir differs) → horror SFX.
- `python3 build.py` → `<key>.html` + `<key>_data.json`; `node tools/stills.mjs <key>.html outdir t1 t2 ...` to preview.
- `node tools/render.mjs <key>.html <key>_video.mp4 <dur>`; `python3 mix.py`; `bash finish.sh <key>` → `<key>_final.mp4`.
- `scene.html` holds the look: CCTV/found-footage frame (REC dot, camera label, ticking timestamp, grain, scanlines,
  vignette, glitch on cuts), word-by-word Anton captions at y≈1330 with key words in red, red PART badge.
  Existing scene types: exterior, monitors, card, escalator, window (mannequins), mannequin, guard, radio,
  bigtext, door, sunrise, badge, endcard, hall. **New stories need new scene functions** — add them to scene.html
  (draw on canvas, deterministic from local time). Every drawn object must read instantly as what it is (owner flagged an abstract 'memorial' of a bent rail + dots + ribbon as random shapes) — if a prop isn't obvious in a still, redraw it or cut it. Keep text out of the bottom ~400 px and keep the scene readable
  (not too dark). Vary settings: houses, forests, hospitals, phones, cars, motels, lakes, etc.
- Paths: vo.py/mix.py/hsfx.py were written for `/root/reel`; run from the work dir and fix paths if needed.

## Layout (owner 2026-11-22: use the frame like Shorts/Reels do)
Put `layout.json` `{"zoom": 1.22, "zoomY": 250, "capY": 1180, "capW": 860}` in the work dir: scenes are scaled up to fill the frame,
captions sit mid-lower over the picture (y≈1180, max 860 px wide so they clear the right-hand buttons), the bottom ~450 px fades
dark for Instagram's username/caption, and the FOLLOW box moves up. Keep scene tags/labels above scene-y ~1000, away from the
caption band, and keep key props inside x 120–960 (the zoom crops the edges).

## Voice & look rules
**Owner (2026-11-21):** Kokoro has no emotional depth. Use ElevenLabs eleven_v3 with horror-style voices and audio tags ([whispers], [low], [shaky], [voice breaking], [desperate]): narrator 'Jack – Deep Dark Horror Narrator' (BVPhWQykET1TSvfGzrUr); older female character 'Lily' (pFZP5JQG7iQjIQuC4Bku), whispered when creepy. **Never use Australian voices.** **Owner (2026-11-21): no female voices — every voice must be male** (entity/whispers: Callum N2lVS1w4EtoT3dr4eOWO whispered, pitched ~7% down; Jack for narration; Will/Liam for young men). Put deliberate silences before and after the key lines (clue text, reveal, last words, final whisper); time pauses after per-line speed-up so they stay exact (see examples/dont-turn-on-the-lights/join.py). Needs an API key from Jayden each session (never save it); see pipeline/examples/lock-the-door/vo11.py. Without a key, fall back to Kokoro and say so.
Narrator: first person, calm and low, never jokey. Captions mirror the narration word by word.
Key words in red: numbers, "never", the monster/object, the twist word, "follow".
