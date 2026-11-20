# Nexa content notes (owner feedback)

- 2026-11-20 (Jayden): carousels must NOT use the cream/peach gradient + dot-grid + orange highlight-box style. It "looks too AI".
  Use a more human, designer-made look instead. Current carousel style (v2, nexa/images/website-costing-customers-6-signs):
  flat off-white background, black Inter headlines, simple wireframe mockups with black outlines,
  hand-drawn orange marker circles and handwritten notes (pipeline/fonts/Caveat.ttf), plain "Fix:" text. No gradients, glows, dot grids.
- 2026-11-20 (Jayden): no em dashes or en dashes (— –) anywhere: slides, captions, on-screen text. Use full stops or commas.
- 2026-11-20 (Jayden): use Nexa brand colours, not orange. Brand (from ads/nexa-sprint-v4): indigo #6557E8 (logo "n." badge),
  lavender #B9A6FF (highlight word / label boxes), deep navy #150C2B (dark backgrounds/text). Headline font: DM Sans ExtraBold.
  Approved-direction carousel template: nexa/images/website-costing-customers-6-signs/src/slides.html (v3). He liked the
  hand-annotated wireframe idea and asked for it to be more visually appealing.
- 2026-11-20 (Jayden): carousels need real images (visually appealing, not overloaded). Use CC0 photos via Openverse
  (api.openverse.org, license=cc0; stocksnap downloads fail here, rawpixel/wordpress.org/wikimedia work), max one per slide,
  no recognisable faces. Keep credits in src/img/CREDITS.md.
- 2026-11-20 (Jayden): still "looks AI" with template elements. Current direction (v5, src/slides.html): fewer elements,
  casual short copy, realistic screenshots, freehand marker scribbles, no label pills / FIX boxes / logo badges / handwriting font,
  slightly different layout per slide. He has no own screenshots or photos to supply.
- 2026-11-20 (Jayden): mockups must look like actual websites (real browser chrome, logos, nav, hero photos, per-business fonts/colours, blurred URL bar). Business names are made up.
- 2026-11-20 (Jayden): reels must use the whole Instagram safe area, not cram into the top half. Safe zones on 1080x1920
  (from his phone screenshot): keep text out of the top 220 px (header/back arrow), the right icon column x>925 below y~940,
  and the bottom 300 px (y>1620: username, caption, audio). Safe content area x 60-920, y 230-1600; visuals ~y 280-1340,
  captions ~y 1385-1600 (box left 60, width 860). Check stills with red zone overlays (see instagram-reels skill section 3b).
- 2026-11-20 (Jayden): reels use ElevenLabs Brian v3 (he supplies the key per chat; never save it).
- 2026-11-20 (Jayden): captions kept coming out left of centre and out of time with the voice. Rules: caption box centred on x=540
  (left 150, width 780); render the whole chunk with unspoken words at opacity 0 so lines never re-centre/slide; word times from
  per-line transcription of the FINAL vo.wav (align.py), rebuilt after any re-voice. Run capcheck.mjs + synccheck.py
  (in nexa/videos/website-myths-3/src/) before sending. Details in instagram-reels skill section 3c.
- 2026-11-20 (Jayden): Internet Stories ep.3 script "really horrible at explaining". Every story must explain the WHY in plain words
  (what a service is, why a domain mattered, who paid what for whom). Don't assume the viewer knows the context.
  Also: ElevenLabs v3 inserts long mid-sentence pauses ("domain ... shop"). Shorten silences >0.26 s inside lines to 0.2 s
  (nexa/videos/internet-stories-ep3-domains/src-v2/join2.py) and LISTEN for flow, not just word completeness.
  Caption text word order must match the spoken `say` order exactly.
