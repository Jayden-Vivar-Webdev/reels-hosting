import json,subprocess,soundfile as sf
L=json.load(open('p1_lines.json'));s=L['starts']+[L['dur']]
a,sr=sf.read('p1_vo.wav');W=[]
for i in range(len(s)-1):
    sf.write('seg.wav',a[int(s[i]*sr):int(s[i+1]*sr)],sr)
    subprocess.run(['python3','tools/transcribe.py','seg.wav','seg.json'],check=True,capture_output=True)
    ws=json.load(open('seg.json'))
    for w in ws: w['start']=round(w['start']+s[i],3); w['end']=round(w['end']+s[i],3)
    print(i,' '.join(w['word'] for w in ws)); W+=ws
json.dump(W,open('p1_words.json','w'),indent=1)
