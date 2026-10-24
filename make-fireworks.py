from PIL import Image, ImageDraw, ImageFont
import math, random
from pathlib import Path
random.seed(18)
W,H=280,520
font=ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf',24)
particles=[(random.uniform(0,math.tau),random.uniform(50,130),random.uniform(.6,1.15),random.uniform(0,math.tau)) for _ in range(23)]
frames=[]
for frame in range(48):
    im=Image.new('RGBA',(W,H),(0,0,0,0));d=ImageDraw.Draw(im)
    for burst,(cx,cy,delay) in enumerate([(135,155,0),(140,340,.6)]):
        t=(frame/16-delay)%3
        if t>2.3: continue
        for a,v,scale,phase in particles:
            x=cx+math.cos(a)*v*t*.7;y=cy+math.sin(a)*v*t*.65+35*t*t
            r=max(8,26*scale*(1-t*.18));rx=max(6,r*abs(math.cos(t*5+phase)))
            if not (r<x<W-r and r<y<H-r):continue
            d.line([(x-math.cos(a)*12,y-math.sin(a)*12),(x,y)],fill=(241,158,38,180),width=2)
            d.ellipse((x-rx,y-r,x+rx,y+r),fill='#e1a42f',outline='#fff3a0',width=2)
            if rx>16:d.text((x,y),'VPN',font=font,anchor='mm',fill='#5a3304',stroke_width=0)
            if t<.8:
                sx=x+16;sy=y-14
                d.line((sx-3,sy,sx+3,sy),fill='#ffe7a0',width=1);d.line((sx,sy-3,sx,sy+3),fill='#ffe7a0',width=1)
    # GIF index zero is reserved for transparent pixels.
    rgb=Image.new('RGB',im.size,(0,0,0));rgb.paste(im,mask=im.getchannel('A'))
    p=rgb.quantize(colors=254);pal=p.getpalette();p=p.point(lambda i:i+1);p.putpalette([0,0,0]+pal[:765]);p.paste(0,mask=im.getchannel('A').point(lambda a:255 if a==0 else 0));p.info['transparency']=0
    frames.append(p)
out=Path('dist/assets/vpn-fireworks-large.gif')
frames[0].save(out,save_all=True,append_images=frames[1:],duration=62,loop=0,transparency=0,disposal=2,optimize=False)
print(out, out.stat().st_size)

