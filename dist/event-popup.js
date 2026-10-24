(()=>{
 // A restored WebView or repeated script must not create another dialog/queue.
 if(window.ilyuhaBannerQueue)return;
 window.ilyuhaBannerQueue={active:false};
 // Remove stale markup left by an older initialization before creating the sole popup.
 document.querySelectorAll?.('#eventPopup').forEach(node=>node.remove());
 const banners=[{id:'halloween',src:'assets/halloween.png',alt:'Хеллоуин вместе с Илюхой'},{id:'senpai',src:'assets/ilyuha-senpai-banner.png',alt:'Илюха кошкодевочка-горничная: нажми на баннер сенпай'},{id:'kaneki',src:'assets/ilyuha-kaneki-mushroom-banner.png',alt:'Илюха в образе Канеки Кена: я умер внутри когда нажал баннер'},{id:'mokou',src:'assets/mokou-banner-v2.png',alt:'Мокоу: Депай бюджет храма Хакурей на Илюха Дроп'},{id:'soldier',src:'assets/ilyuha-soldier-banner.png',alt:'А ты уже депнул на Илюха Дроп?'},{id:'dunduk',src:'assets/dunduk-banner.png',alt:'На Илюха Дроп ПОМОЖЕТ'},{id:'access',src:'assets/access-toast-banner.png',alt:'Проблемы с доступом к Илюха Дроп?'},{id:'steam',src:'assets/steam-banner.png',alt:'Быстро пополняй Steam в Илюха Дроп'},{id:'hair',src:'assets/ilyuha-blond-clinic-banner.png',alt:'Пересадка волос на Илюха Дроп'},{id:'subscription',src:'assets/ilyuha-subscription-banner.png',alt:'куплю подписку, оптимизирую пайплайн'},{id:'seer',src:'assets/ilyuha-seer-banner.png',alt:'вижу сочный дроп жми илюха дроп'},{id:'green',src:'assets/ilyuha-green-banner.png',alt:'Пора депать Илюха Дроп'}];
 const popup=document.createElement('dialog');popup.id='eventPopup';popup.setAttribute('aria-label','Баннер Илюхи');popup.innerHTML=`<img class="flying-chip" alt="" aria-hidden="true"><img class="coin-fireworks fireworks-left" src="assets/vpn-fireworks-wide.gif" alt="" aria-hidden="true"><img class="coin-fireworks fireworks-right" src="assets/vpn-fireworks-wide.gif" alt="" aria-hidden="true"><div class="popup-frame"><button class="popup-close" aria-label="Закрыть баннер">×</button><button class="popup-poster" aria-label="Перейти в режим СБЭУ"><img alt=""></button></div>`;document.body.append(popup);

 function shuffled(){const order=[...banners];for(let i=order.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]];}return order;}
 let order=shuffled();
 let phase='waiting',timer=null,flightTimer=null,epoch=0,cursor=0,nextAllowed=Date.now()+8000,suspended=false;
 const chip=popup.querySelector('.flying-chip'),poster=popup.querySelector('.popup-poster img');
 function stopTimer(){clearTimeout(timer);timer=null;epoch++;}
 function cleanupFlight(){clearTimeout(flightTimer);flightTimer=null;chip.hidden=true;chip.onload=null;chip.removeAttribute?.('src');}
 function purgeDuplicates(){document.querySelectorAll?.('#eventPopup, #halloweenEvent').forEach(node=>{if(node!==popup)node.remove();});}
 function plan(){stopTimer();if(suspended||phase!=='waiting')return;const ticket=epoch;timer=setTimeout(()=>{if(ticket!==epoch||suspended||phase!=='waiting')return;timer=null;show();},Math.max(0,nextAllowed-Date.now()));}
 function retry(){nextAllowed=Math.max(nextAllowed,Date.now()+2000);plan();}
 function finish(){if(phase!=='visible'&&phase!=='opening')return;phase='waiting';window.ilyuhaBannerQueue.active=false;stopTimer();cleanupFlight();cursor++;const completed=cursor>=banners.length;if(completed){cursor=0;order=shuffled();}nextAllowed=Date.now()+(completed?180000:25000);plan();}
 function dismiss(){if(phase!=='visible')return;phase='closing';stopTimer();cleanupFlight();if(popup.open)popup.close();phase='visible';finish();}
 async function show(){if(phase!=='waiting'||suspended)return;purgeDuplicates();if(popup.open){phase='visible';window.ilyuhaBannerQueue.active=true;return;}if(document.hidden||busy||document.querySelector('dialog[open]')||page==='sbeu'){retry();return;}phase='opening';stopTimer();window.ilyuhaBannerQueue.active=true;const banner=order[cursor];const opening=epoch;poster.style&&(poster.style.visibility='hidden');poster.src=banner.src;poster.alt=banner.alt;try{if(typeof poster.decode==='function')await poster.decode();if(opening!==epoch||suspended){phase='waiting';window.ilyuhaBannerQueue.active=false;return;}if(document.hidden||busy||document.querySelector('dialog[open]')||page==='sbeu'){phase='waiting';window.ilyuhaBannerQueue.active=false;retry();return;}if(poster.style)poster.style.visibility='visible';popup.showModal();phase='visible';}catch{phase='waiting';window.ilyuhaBannerQueue.active=false;retry();return;}const flight=epoch;chip.onload=()=>{if(phase!=='visible'||!popup.open||flight!==epoch)return;chip.hidden=false;clearTimeout(flightTimer);flightTimer=setTimeout(()=>{chip.hidden=true;},4600);};chip.hidden=true;chip.src='assets/ilyuha-flying-chip-spin.gif?flight='+Date.now();}
 popup.querySelector('.popup-close').onclick=dismiss;
 popup.querySelector('.popup-poster').onclick=()=>{dismiss();page='sbeu';render();window.scrollTo({top:0,behavior:'instant'});};
 popup.addEventListener('cancel',e=>{e.preventDefault();dismiss();});
 popup.addEventListener('close',()=>{if(popup.open||phase==='closing'||phase==='waiting')return;finish();});
 window.addEventListener('pagehide',()=>{suspended=true;stopTimer();cleanupFlight();});
 window.addEventListener('pageshow',()=>{suspended=false;purgeDuplicates();if(popup.open){phase='visible';window.ilyuhaBannerQueue.active=true;}else{if(phase==='visible')finish();else{phase='waiting';window.ilyuhaBannerQueue.active=false;plan();}}});
 if(typeof MutationObserver!=='undefined'){new MutationObserver(purgeDuplicates).observe(document.body,{childList:true});}
 const baseOpenCase=openCase;openCase=function(id){if(phase==='visible'||phase==='opening')return;baseOpenCase(id);};
 window.ilyuhaBannerQueue.dismiss=dismiss;
 plan();
})();


