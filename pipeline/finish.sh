p=$1
ffmpeg -v error -y -i ${p}_mix.wav -af loudnorm=I=-14:TP=-1.5:LRA=11 -ar 48000 ${p}_norm.wav
ffmpeg -v error -y -i ${p}_video.mp4 -i ${p}_norm.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart ${p}_final.part.mp4 && mv ${p}_final.part.mp4 ${p}_final.mp4
ffmpeg -v error -y -i ${p}_final.mp4 -vf "fps=0.5,scale=216:384,tile=12x2" -frames:v 1 ${p}_contact.jpg
ffprobe -v error -show_entries format=duration:stream=codec_name,width,height -of csv=p=0 ${p}_final.mp4
