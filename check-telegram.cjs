const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
for(const inside of [false,true]){
 const calls=[];let back;const nodes=new Map();const el=k=>{if(!nodes.has(k))nodes.set(k,{open:false,append(){},close(){this.open=false}});return nodes.get(k);};
 const tg={initData:inside?'signed-test':'',isVersionAtLeast:()=>true,ready(){calls.push('ready')},expand(){calls.push('expand')},setHeaderColor(){},setBackgroundColor(){},setBottomBarColor(){},onEvent(){},BackButton:{show(){calls.push('show')},hide(){calls.push('hide')},onClick(fn){back=fn}},HapticFeedback:{impactOccurred(){}}};
 const ctx=vm.createContext({window:{Telegram:{WebApp:tg},innerHeight:700},document:{documentElement:{classList:{add(){}},style:{setProperty(){}}},querySelector:el,addEventListener(){},createElement:()=>({})},MutationObserver:class{observe(){}},$:el,page:'inventory',busy:false,render(){calls.push('render')}});
 vm.runInContext(fs.readFileSync('dist/telegram.js','utf8'),ctx);
 if(inside){assert(calls.includes('ready'));assert(calls.includes('expand'));assert(calls.includes('show'));back();assert.equal(vm.runInContext('page',ctx),'cases');el('#caseDialog').open=true;back();assert.equal(el('#caseDialog').open,false);}else assert.equal(calls.length,0);
}
console.log('PASS: browser fallback, Telegram initialization, navigation and dialog back button');
