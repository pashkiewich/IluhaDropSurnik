const fs=require('node:fs');const p='dist/app.js';let s=fs.readFileSync(p,'utf8');
s=s.replace('state.inventory.push(item);state.opened++','if(item.type===\'currency\')state.balance+=item.value;else state.inventory.push(item);state.opened++');
s=s.replace('<p>Предмет уже в инвентаре · ${item.value} VPN</p>','<p>${item.type===\'currency\'?\'Монеты уже зачислены на баланс\':`Предмет уже в инвентаре · ${item.value} VPN`}</p>');
s=s.replace('<button class="primary wide" id="sellReward">Обменять на ${item.value} VPN</button>','${item.type===\'currency\'?\'\':`<button class="primary wide" id="sellReward">Обменять на ${item.value} VPN</button>`}');
s=s.replace('>Оставить в инвентаре</button>','>${item.type===\'currency\'?\'Отлично\':\'Оставить в инвентаре\'}</button>');
s=s.replace("$('#sellReward').onclick=", "if($('#sellReward'))$('#sellReward').onclick=");
fs.writeFileSync(p,s);
