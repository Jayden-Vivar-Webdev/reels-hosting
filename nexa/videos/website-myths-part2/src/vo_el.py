import json, os, sys, requests, numpy as np, soundfile as sf
K=os.environ["ELEVEN_API_KEY"]; V="nPczCjzI2devNBz1zQrb"
L=json.load(open("script.json")); os.makedirs("el",exist_ok=True)
idx=[int(x) for x in sys.argv[1:]] or range(len(L))
for i in idx:
    r=requests.post(f"https://api.elevenlabs.io/v1/text-to-speech/{V}?output_format=pcm_24000",headers={"xi-api-key":K},
        json={"text":L[i].get("say",L[i]["text"]),"model_id":"eleven_v3","voice_settings":{"stability":0.5}},timeout=120)
    if r.status_code!=200: print("ERR",i,r.status_code,r.text[:300]); sys.exit(1)
    a=np.frombuffer(r.content,dtype=np.int16).astype(np.float32)/32768
    sf.write(f"el/{i:02d}.wav",a,24000); print("done",i,flush=True)
