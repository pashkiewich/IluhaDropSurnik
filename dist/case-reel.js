const CaseReel=(()=>{
 const WIN_INDEX=38,STEP=156;
 function sequence(c,winner){return Array.from({length:45},(_,i)=>i===WIN_INDEX?winner:Game.pick(c));}
 function markup(c,winner){return `<div class="reel-window" aria-label="Прокрутка предметов"><div class="reel-pointer" aria-hidden="true"></div><div class="reel-track">${sequence(c,winner).map((it,i)=>`<div class="reel-item ${it.rarity}" ${i===WIN_INDEX?'data-winner="true"':''}><div>${itemVisual(it)}</div><b>${it.name}</b></div>`).join('')}</div></div>`;}
 function animate(){const viewport=document.querySelector('.reel-window'),track=document.querySelector('.reel-track');if(!viewport||!track||!track.animate)return;const distance=WIN_INDEX*STEP+72-viewport.clientWidth/2;const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;track.animate([{transform:'translateX(0)'},{transform:`translateX(${-distance}px)`}],{duration:reduced?1:(CaseReel.fast?2100:4200),easing:'cubic-bezier(.12,.68,.12,1)',fill:'forwards'});}
 let fast=false;try{fast=localStorage.getItem('ilyuha-fast-spin')==='1';}catch{}
 return {markup,animate,sequence,WIN_INDEX,fast,setFast(value){this.fast=Boolean(value);try{localStorage.setItem('ilyuha-fast-spin',this.fast?'1':'0');}catch{}}};
})();
