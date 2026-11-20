# draw approximate Instagram UI over a still to check safe zones
import sys
from PIL import Image, ImageDraw
im=Image.open(sys.argv[1]).convert("RGBA"); o=Image.new("RGBA",im.size); d=ImageDraw.Draw(o)
d.rectangle([0,0,1080,220],fill=(255,0,0,60))        # top: header/back arrow
d.rectangle([925,940,1080,1920],fill=(255,0,0,60))   # right: like/comment/share/save column
d.rectangle([0,1620,1080,1920],fill=(255,0,0,60))    # bottom: username, caption, audio
Image.alpha_composite(im,o).convert("RGB").save(sys.argv[2])
