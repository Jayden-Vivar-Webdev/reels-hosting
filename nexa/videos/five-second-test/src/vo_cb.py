import json, sys, torch, torchaudio as ta
from chatterbox.tts import ChatterboxTTS
m=ChatterboxTTS.from_pretrained(device="cpu")
L=json.load(open("script.json"))
idx=[int(x) for x in sys.argv[1:]] or range(len(L))
seed=int(__import__('os').environ.get('SEED','3'))
for i in idx:
    torch.manual_seed(seed); w=m.generate(L[i].get("say",L[i]["text"]),exaggeration=0.5,cfg_weight=0.45)
    ta.save(f"cb/{i:02d}.wav",w,m.sr); print("done",i,flush=True)
