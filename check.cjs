const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const elements=new Map();function el(key){if(!elements.has(key))elements.set(key,{textContent:'',innerHTML:'',classList:{add(){},remove(){},toggle(){}},querySelectorAll(){return[];},showModal(){},close(){},addEventListener(){}});return elements.get(key);}
let stored;const timers=[];const ctx=vm.createContext({console,crypto:require('node:crypto').webcrypto,sessionStorage:{getItem(){return null},setItem(){}},localStorage:{getItem(){return null},setItem(k,v){stored=v}},document:{querySelector:el,querySelectorAll(){return[]}},setTimeout(fn){timers.push(fn)}});
vm.runInContext(fs.readFileSync('dist/logic.js','utf8')+fs.readFileSync('dist/case-reel.js','utf8')+fs.readFileSync('dist/app.js','utf8'),ctx);
vm.runInContext("spin(Game.cases[0]);spin(Game.cases[0]);",ctx);
let s=JSON.parse(stored);assert.equal(s.balance,1237);assert.equal(s.inventory.length,1);assert.equal(s.opened,1);
vm.runInContext('sell(state.inventory[0].id)',ctx);s=JSON.parse(stored);assert.equal(s.inventory.length,0);const balance=s.balance;vm.runInContext("sell('missing')",ctx);assert.equal(JSON.parse(stored).balance,balance);
vm.runInContext('state.balance=100;save()',ctx);el('#bonus').onclick();assert.equal(JSON.parse(stored).balance,100);vm.runInContext('state.balance=99;save()',ctx);el('#bonus').onclick();assert.equal(JSON.parse(stored).balance,599);el('#bonus').onclick();assert.equal(JSON.parse(stored).balance,599);vm.runInContext('state.balance=0;save()',ctx);el('#bonus').onclick();assert.equal(JSON.parse(stored).balance,500);
console.log('PASS: debit once, persist reward, exchange once, refill below 100, no daily limit, no duplicate credit');

