const fs=require('node:fs');
const file='dist/app.js';let js=fs.readFileSync(file,'utf8');
js=js.replace(/function art\(c\)\{[^\n]+/,`function art(c){return \`<div class="case-art real-art" style="--accent:\${c.color}"><div class="aura"></div><div class="case-sprite sprite-\${c.id}" role="img" aria-label="\${c.name}"></div></div>\`;}`);
js=js.replace(/<div class="hero-portrait">.*?<\/div><\/section>/,'<div class="hero-portrait"><img src="assets/hero.png" alt="Илюха с сигарой и золотой VPN-монетой"></div></section>');
js=js.replace('</section><section class="case-section">','</section><section class="event-banner" id="halloweenEvent"><img src="assets/halloween.png" alt="Хеллоуин вместе с Илюхой — праздничный баннер"><button class="event-close" aria-label="Скрыть хеллоуинский баннер">×</button><span class="event-caption">ХЕЛЛОУИНСКИЙ ИВЕНТ · СКОРО · ТОЛЬКО ИГРОВЫЕ VPN</span></section><section class="case-section">');
js=js.replace("$('#heroSpin').onclick=()=>openCase('fat');","$('#heroSpin').onclick=()=>openCase('fat');if(sessionStorage.getItem('hideHalloween'))$('#halloweenEvent').hidden=true;$('.event-close').onclick=()=>{$('#halloweenEvent').hidden=true;sessionStorage.setItem('hideHalloween','1');};");
fs.writeFileSync(file,js);
