from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import math, random

# Procedural coin geometry: shaded face, milled edge, raised letters.
W, H, N, FPS = 760, 680, 64, 20
rng = random.Random(28)
font = ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', 28)
small = ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', 13)
particles = [(i/N, rng.uniform(-94,94), rng.uniform(410,490),
              rng.uniform(.70,1.14), rng.uniform(0,math.tau)) for i in range(N)]

def coin(angle, scale):
    im = Image.new('RGBA',(110,120))
    d = ImageDraw.Draw(im)
    # A thick golden cylinder behind the raised face.
    for offset in range(12,0,-1):
        d.ellipse((8+offset,6+offset,96+offset,94+offset),
                  fill=(142+offset*5,66+offset*4,7,255))
    for a in range(0,360,12):
        rad=math.radians(a)
        x,y=52+44*math.cos(rad),50+44*math.sin(rad)
        if math.sin(rad)+math.cos(rad)>0:
            d.line((x,y,x+11,y+11),fill='#fff0a1',width=2)
    for inset in range(43):
        t=inset/43
        d.ellipse((8+inset,6+inset,96-inset,94-inset),
                  fill=(255-int(t*24),207-int(t*62),57-int(t*31)))
    d.ellipse((10,8,94,92),outline='#fff6bb',width=3)
    d.ellipse((16,14,88,86),outline='#aa5a08',width=2)
    d.ellipse((19,17,85,83),outline='#ffeaa1',width=2)
    d.text((53,54),'VPN',font=font,anchor='mm',fill='#fff6bb',stroke_width=1)
    d.text((51,51),'VPN',font=font,anchor='mm',fill='#7c3c05')
    d.text((52,28),'★',font=small,anchor='mm',fill='#fff6bb')
    d.text((52,76),'★ ★ ★',font=small,anchor='mm',fill='#8a4805')
    # Foreshortening shows spin while keeping the label readable.
    sx=.58+.42*abs(math.cos(angle))
    return im.resize((int(82*scale*sx),int(89*scale)),Image.Resampling.LANCZOS).rotate(
        math.sin(angle)*22,resample=Image.Resampling.BICUBIC,expand=True)

frames=[]
for frame in range(N):
    im=Image.new('RGBA',(W,H+140)); d=ImageDraw.Draw(im)
    positions=[]
    for delay,vx,vy,scale,phase in particles:
        age=((frame/N-delay)%1)*3.2
        x=W/2+vx*age; y=H+35-vy*age+112*age*age
        if -60<x<W+60 and -70<y<H+60:
            positions.append((scale,x,y,age,phase,vx))
    for scale,x,y,age,phase,vx in sorted(positions):
        d.line((x-vx*.04,y+18,x,y),fill='#d58b16',width=2)
        c=coin(age*3+phase,scale)
        im.alpha_composite(c,(round(x-c.width/2),round(y-c.height/2)))
    d=ImageDraw.Draw(im)
    for j in range(32):
        a=j*2.39996; t=(frame/N+j/32)%1
        x=W/2+math.sin(a)*130*t; y=H-60-570*t
        length=2+3*abs(math.sin(frame*.25+j))
        d.line((x-length,y,x+length,y),fill='#fff6b7',width=1)
        d.line((x,y-length,x,y+length),fill='#ffe471',width=1)
    rgb=Image.new('RGB',im.size);rgb.paste(im,mask=im.getchannel('A'))
    p=rgb.quantize(colors=254);pal=p.getpalette();p=p.point(lambda i:i+1)
    p.putpalette([0,0,0]+pal[:765]);p.paste(0,mask=im.getchannel('A').point(lambda a:255 if a<90 else 0))
    p.info['transparency']=0;frames.append(p)
out=Path('dist/assets/vpn-fireworks-wide.gif')
frames[0].save(out,save_all=True,append_images=frames[1:],duration=1000//FPS,
               loop=0,transparency=0,disposal=2,optimize=False)
frames[16].save('fountain-preview.png',transparency=0)
print(out, out.stat().st_size, 'bytes;',len(frames),'frames')
