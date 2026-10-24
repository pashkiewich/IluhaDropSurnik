const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let now=0,seq=0,created=0,other=false;const timers=new Map(),listeners={};const img={},buttons={};const popup={open:false,setAttribute(){},querySelector(s){return s.includes('img')?img:(buttons[s]??={});},addEventListener(n,f){listeners[n]=f},showModal(){assert(!this.open);this.open=true},close(){this.open=false;listeners.close()}};
const storage=new Map();const ctx=vm.createContext({openCase(){},window:{addEventListener(){}},document:{hidden:false,createElement(){created++;return popup},body:{append(){}},querySelector(){return other||popup.open}},$:()=>({open:false}),busy:false,page:'cases',Date:{now:()=>now},sessionStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},setTimeout(f,d){const id=++seq;timers.set(id,{f,at:now+d});return id},clearTimeout(id){timers.delete(id)}});
function tick(ms){now+=ms;for(const [id,t] of [...timers])if(t.at<=now){timers.delete(id);t.f()}}
const src=fs.readFileSync('dist/event-popup.js','utf8');vm.runInContext(src,ctx);vm.runInContext(src,ctx);assert.equal(created,1);other=true;tick(8000);assert(!popup.open);other=false;tick(2000);assert(popup.open);const first=img.src;const cycle=[first];tick(60000);assert.equal(img.src,first);popup.close();listeners.close();listeners.close();tick(24999);assert(!popup.open);tick(1);assert(popup.open);assert.notEqual(img.src,first);cycle.push(img.src);assert.equal(timers.size,0);for(let i=0;i<10;i++){popup.close();tick(25000);assert(popup.open);cycle.push(img.src);}assert.equal(new Set(cycle).size,12);const finalImage=img.src;tick(180000);assert(popup.open);assert.equal(img.src,finalImage);popup.close();tick(179999);assert(!popup.open);tick(1);assert(popup.open);assert(popup.open);console.log('PASS: singleton queue, 25s intervals, 3min restart after last close');





