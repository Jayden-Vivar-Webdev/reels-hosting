import os, json, sys, numpy as np, soundfile as sf, urllib.request
KEY=os.environ["ELEVEN_API_KEY"]; T=json.load(open("tagged.json")); PA=json.load(open("pauses.json"))
os.makedirs("el", exist_ok=True)
only = set(sys.argv[1:])
def tts(vid, text, seed):
    body=json.dumps({"text":text,"model_id":"eleven_v3","voice_settings":{"stability":0.0 if False else 0.5},"seed":seed}).encode()
    r=urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{vid}?output_format=pcm_24000",data=body,headers={"xi-api-key":KEY,"Content-Type":"application/json"})
    return np.frombuffer(urllib.request.urlopen(r,timeout=120).read(),dtype=np.int16).astype(np.float32)/32768
def trim(a, thr=0.01):
    idx=np.where(np.abs(a)>thr)[0]; return a[max(idx[0]-1800,0):idx[-1]+2400] if len(idx) else a
for p, lines in T.items():
    sr=24000
    for i,(vid,text) in enumerate(lines):
        f=f"el/{p}_{i}.wav"
        if os.path.exists(f) and str(i) not in only: continue
        seed=int(os.environ.get("SEED","7"))
        a=tts(vid,text,seed); sf.write(f,a,sr); print("gen",i,round(len(a)/sr,2))
    out=[np.zeros(int(sr*0.3))]; t=0.3; starts=[]
    for i,(vid,text) in enumerate(lines):
        a,_=sf.read(f"el/{p}_{i}.wav",dtype="float32"); a=trim(a,0.006); a=a/(np.abs(a).max()+1e-9)*0.9
        starts.append(round(t,3)); out.append(a); t+=len(a)/sr
        gap=float(PA.get(p,{}).get(str(i),0.28)); out.append(np.zeros(int(sr*gap))); t+=gap
    out.append(np.zeros(int(sr*1.2))); y=np.concatenate(out); sf.write(f"{p}_vo.wav",y,sr)
    json.dump({"starts":starts,"dur":len(y)/sr},open(f"{p}_lines.json","w")); print(p,round(len(y)/sr,1))
