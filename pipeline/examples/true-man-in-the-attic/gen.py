import os, json, sys, numpy as np, soundfile as sf, urllib.request
KEY=os.environ["ELEVEN_API_KEY"]; T=json.load(open("tagged.json")); os.makedirs("el",exist_ok=True)
only=set(sys.argv[1:]); seed=int(os.environ.get("SEED","7"))
for i,(vid,text) in enumerate(T["p1"]):
    f=f"el/p1_{i}.wav"
    if os.path.exists(f) and str(i) not in only: continue
    body=json.dumps({"text":text,"model_id":"eleven_v3","voice_settings":{"stability":0.5},"seed":seed}).encode()
    r=urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{vid}?output_format=pcm_24000",data=body,headers={"xi-api-key":KEY,"Content-Type":"application/json"})
    a=np.frombuffer(urllib.request.urlopen(r,timeout=120).read(),dtype=np.int16).astype(np.float32)/32768
    sf.write(f,a,24000); print("gen",i,round(len(a)/24000,2))
