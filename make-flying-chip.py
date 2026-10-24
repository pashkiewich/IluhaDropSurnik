from PIL import Image,ImageDraw
import math
from pathlib import Path
W,H=800,440
logo=Image.open('dist/assets/ilyuha-chip-logo.png').convert('RGBA')
chip=Image.new('RGBA',(240,240));d=ImageDraw.Draw(chip)
d.ellipse((4,4,236,236),fill='#941d19',outline='#ffdb83',width=7)
for i in range(16):
 a=i*math.tau/16
 x,y=120+104*math.cos(a),120+104*math.sin(a)
 d.ellipse((x-6,y-6,x+6,y+6),fill='#fff0bf')
logo=logo.resize((184,184),Image.Resampling.LANCZOS)
mask=Image.new('L',(184,184));ImageDraw.Draw(mask).ellipse((0,0,183,183),fill=255)
chip.paste(logo,(28,28),mask)
frames=[]
for i in range(72):
 t=i/71
 # A smooth speed dip at the apex; entry and exit retain the same speed.
 u=t+.12*math.sin(math.tau*t)
 x=-220+1240*u;y=320-125*math.sin(math.pi*u)
 scale=0.67+0.33*math.sin(math.pi*u)
 # Two full turns; the portrait is upright at the slow apex.
 angle=(u-.5)*720
 obj=chip.rotate(angle,resample=Image.Resampling.BICUBIC,expand=True)
 obj=obj.resize((int(obj.width*scale),int(obj.height*scale)),Image.Resampling.LANCZOS)
 frame=Image.new('RGBA',(W,H));frame.alpha_composite(obj,(int(x-obj.width/2),int(y-obj.height/2)))
 rgb=Image.new('RGB',(W,H));rgb.paste(frame,mask=frame.getchannel('A'))
 p=rgb.quantize(colors=254);pal=p.getpalette();p=p.point(lambda v:v+1);p.putpalette([0,0,0]+pal[:765]);p.paste(0,mask=frame.getchannel('A').point(lambda a:255 if a<20 else 0));frames.append(p)
blank=Image.new('P',(W,H),0)
blank.putpalette(frames[0].getpalette())
frames.extend([blank.copy(),blank.copy()])
out=Path('dist/assets/ilyuha-flying-chip-spin.gif')
frames[0].save(out,save_all=True,append_images=frames[1:],duration=65,disposal=2,transparency=0,optimize=False)
print(out,out.stat().st_size)



