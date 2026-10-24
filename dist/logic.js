const Game = (() => {
 const items=[{name:'Конфиг с прода',icon:'⌘',value:30,rarity:'common'},{name:'Большой сырник',icon:'◉',value:80,rarity:'common'},{name:'Белый IP деда',icon:'◎',value:180,rarity:'rare'},{name:'Длинный пайплайн',icon:'⛓',value:300,rarity:'epic'},{name:'У меня работает',icon:'✦',value:800,rarity:'legendary'}];
 const cases=[{id:'fat',name:'Толстый Илюха',desc:'Пузатый дроп',price:100,symbol:'◉',color:'#e6b65c',weights:[45,30,17,7,1]},{id:'cat',name:'Кот Максим',desc:'Рыжий. Глупый. Твой.',price:250,symbol:'≽•⩊•≼',color:'#e58851',weights:[20,30,30,17,3]},{id:'tongue',name:'Шершавый язычок',desc:'Лизнул — и в прод',price:500,symbol:'≽◉ᴥ◉≼',color:'#a598e0',weights:[10,15,30,35,10]},{id:"larp",name:"Ларп кейс",desc:"Ледяной дроп от сильнейшей феи.",price:150,symbol:"◉",color:"#73baff",weights:[25,45,20,8,2]}];
 cases.push({id:"tarkov",name:"Побег из Таркова",desc:"Вынеси дроп. Найди выход.",price:300,symbol:"◈",color:"#acb86b",weights:[15,35,30,17,3]});
 const fatItems=[
 {name:'Танго',icon:'☘',sprite:'assets/item-tango.png',value:15,rarity:'common'},
 {name:'Манго',icon:'🥭',sprite:'assets/item-mango.png',value:35,rarity:'uncommon'},
 {name:'Чебупицца',icon:'🥟',sprite:'assets/item-chebupizza.png',value:100,rarity:'rare'},
 {name:'Зубная паста',icon:'🦷',sprite:'assets/item-toothpaste.png',value:250,rarity:'epic'},
 {name:'Шампунь',icon:'🧴',sprite:'assets/item-shampoo.png',value:350,rarity:'mythic'},
 {name:'Венский уродец',icon:'▧',sprite:'assets/item-vienna.png',value:450,rarity:'mythic'},
 {name:'Сырник',icon:'◉',sprite:'assets/item-syrnik-plain.png',value:1200,rarity:'legendary'}];
 cases.find(c=>c.id==='fat').weights=[40,28,17,7,4,3,1];
 const catItems=[
 {name:'Сухой корм',icon:'🐾',sprite:'assets/item-dry-food.png',value:50,rarity:'common'},
 {name:'Мокрый корм',icon:'🥫',sprite:'assets/item-wet-food.png',value:100,rarity:'uncommon'},
 {name:'150 VPN-коинов',icon:'🪙',sprite:'assets/item-150-vpn.png',value:150,rarity:'rare',type:'currency'},
 {name:'Блевота в коридоре',icon:'〰',sprite:'assets/item-vomit.png',value:600,rarity:'epic'},
 {name:'Справка об аутизме',icon:'▤',sprite:'assets/item-certificate.png',value:2000,rarity:'legendary'}];
 cases.find(c=>c.id==='cat').weights=[40,30,20,9,1];
 const larpItems=[
 {name:'СБЭУ комар',icon:'◈',sprite:'assets/item-mosquito.png',value:20,rarity:'common'},
 {name:'Рыба ларп',icon:'🐟',sprite:'assets/item-larp-fish.png',value:50,rarity:'uncommon'},
 {name:'Лимбус',icon:'◉',sprite:'assets/item-limbus.png',value:120,rarity:'rare'},
 {name:'Тикток',icon:'♪',sprite:'assets/item-tiktok.svg',value:300,rarity:'epic'},
 {name:'Когда плачут ларперы',icon:'♧',sprite:'assets/item-rika.png',value:600,rarity:'mythic'},
 {name:'Сырно',icon:'❄',sprite:'assets/item-cirno.png',value:1600,rarity:'legendary'}];
 cases.find(c=>c.id==='larp').weights=[40,28,17,9,5,1];
 const tarkovItems=[
 {name:'Вдвоёмкины',icon:'◈',sprite:'assets/item-tarkov-duo.png',value:50,rarity:'common'},
 {name:'Патькины',icon:'◈',sprite:'assets/item-tarkov-party.png',value:100,rarity:'uncommon'},
 {name:'Тиммейты',icon:'◈',sprite:'assets/item-tarkov-teammates.png',value:200,rarity:'rare'},
 {name:'СБЭУ комар',icon:'◈',sprite:'assets/item-mosquito.png',value:20,rarity:'common'},
 {name:'Потеря пакетов',icon:'⌁',sprite:'assets/item-tarkov-packets.png',value:800,rarity:'mythic'},
 {name:'Сидуны',icon:'♧',sprite:'assets/item-tarkov-campers.png',value:1500,rarity:'mythic'},
 {name:'Кепарик',icon:'♛',sprite:'assets/item-tarkov-cap.png',value:3500,rarity:'legendary'}];
 cases.find(c=>c.id==='tarkov').weights=[35,25,18,11,6,4,1];
 function getItems(c){return c?.id==='fat'?fatItems:c?.id==='cat'?catItems:c?.id==='larp'?larpItems:c?.id==='tarkov'?tarkovItems:items;}
 function rarest(c){const pool=getItems(c);return pool[c.weights.indexOf(Math.min(...c.weights))];}
 function pick(c,random=Math.random()){const pool=getItems(c);let sum=0;for(let i=0;i<c.weights.length;i++){sum+=c.weights[i];if(random*100<sum)return {...pool[i]};}return {...pool[pool.length-1]};}
 return {items,cases,pick,getItems,rarest};
})();
if(typeof module!=='undefined')module.exports=Game;


