// Telegram metadata is used for presentation only, never for authentication.
const TelegramApp = (() => {
 const tg=window.Telegram?.WebApp;
 const inside=Boolean(tg?.initData);
 function supported(v){return tg&&tg.isVersionAtLeast(v);}
 function haptic(kind='light'){if(inside&&supported('6.1'))tg.HapticFeedback.impactOccurred(kind);}
 function syncBack(){if(!inside||!supported('6.1'))return;const visible=$('#eventPopup')?.open||$('#caseDialog').open||page!=='cases';visible?tg.BackButton.show():tg.BackButton.hide();}
 if(inside){
  document.documentElement.classList.add('in-telegram');
  tg.ready();tg.expand();
  if(supported('6.1')){tg.setHeaderColor('#151512');tg.setBackgroundColor('#151512');}
  if(supported('7.10'))tg.setBottomBarColor('#151512');
  function viewport(){document.documentElement.style.setProperty('--app-height',`${tg.viewportStableHeight||window.innerHeight}px`);}
  viewport();tg.onEvent('viewportChanged',viewport);
  if(supported('6.1'))tg.BackButton.onClick(()=>{if(busy)return;if($('#eventPopup')?.open){$('#eventPopup').close();syncBack();return;}if($('#caseDialog').open){$('#caseDialog').close();}else{page='cases';render();}syncBack();});
  if(supported('8.0'))tg.onEvent('safeAreaChanged',viewport);
  const label=document.querySelector('.proto');if(label)label.textContent='TELEGRAM MINI APP · ПРОТОТИП';
 }
 // Keep the native back button in sync with app navigation and dialogs.
 const observer=new MutationObserver(syncBack);observer.observe($('#main'),{childList:true});observer.observe($('#caseDialog'),{attributes:true,attributeFilter:['open']});
 if($('#eventPopup'))observer.observe($('#eventPopup'),{attributes:true,attributeFilter:['open']});
 document.addEventListener('click',e=>{if(e.target.closest('button:not(:disabled)'))haptic();});
 const mobileBonus=document.createElement('button');mobileBonus.id='mobileBonus';mobileBonus.className='mobile-bonus subtle';mobileBonus.textContent='500 VPN · при балансе ниже 100';mobileBonus.onclick=()=>$('#bonus').click();document.querySelector('aside').append(mobileBonus);if(typeof sync==='function')sync();
 syncBack();return {inside,haptic,syncBack};
})();
