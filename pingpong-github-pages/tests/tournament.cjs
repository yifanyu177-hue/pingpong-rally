const assert=require('node:assert/strict');
const {makeEvent,propagate,winner,validate,matchBest,drawSlots,applyDraw,ruleChangePreview,parseSeedImport}=require('../app.js');
for(let n=2;n<=32;n++)for(const count of [0,2,4].filter(c=>c<=n))for(let trial=0;trial<20;trial++){
 const seeds=Array.from({length:count},(_,i)=>n-1-i),slots=drawSlots(n,seeds),size=slots.length;
 assert.equal(new Set(slots.filter(x=>x!==null)).size,n);assert.equal(slots.filter(x=>x===null).length,size-n);
 for(let i=0;i<size;i+=2)assert(slots[i]!==null||slots[i+1]!==null);
 if(count>=2){assert.equal(slots[0],seeds[0]);assert.equal(slots[size-1],seeds[1]);}
 if(count===4)assert.equal(new Set(seeds.map(id=>Math.floor(slots.indexOf(id)/(size/4)))).size,4);
 let e=makeEvent('test','knockout',Array.from({length:n},(_,i)=>'P'+i));applyDraw(e,slots,seeds);for(const m of e.matches){if(m.bye)continue;assert(m.a!==null&&m.b!==null);m.sets=[[11,5],[11,6]];propagate(e);}assert(winner(e.matches.at(-1))!==null);assert.equal(e.matches.filter(m=>!m.bye).length,n-1);
}
let e=makeEvent('eight','knockout',Array.from({length:8},(_,i)=>'P'+i));for(let m of e.matches){m.sets=[[11,8],[11,9]];propagate(e)}
let change=ruleChangePreview(e,{8:3,4:5,2:5});assert.equal(change.cleared.length,3);assert.equal(change.next.matches[0].sets.length,2);assert.equal(e.matches[4].sets.length,2);assert.equal(matchBest(change.next,change.next.matches[4]),5);assert.equal(matchBest(change.next,change.next.matches[6]),5);
let changedEarly=ruleChangePreview(e,{8:5,4:3,2:3});assert.equal(changedEarly.cleared.length,7);
assert.equal(validate([[11,8],[11,9]],5),'请录完比赛，需一方先赢3局。');assert.equal(validate([[11,8],[11,9],[12,10]],5),'');
assert.deepEqual(parseSeedImport('姓名,排名\nP6,1\nP3,2\nP2,3\nP0,4\nP1,5\nP4,6\nP5,7\nP7,8',e.names,2),[6,3]);assert.deepEqual(parseSeedImport('P6\t1\nP3\t2\nP2\t3\nP0\t4',e.names,4),[6,3,2,0]);assert.throws(()=>parseSeedImport('P6,1\nP6,2',e.names,2));assert.throws(()=>parseSeedImport('unknown,1\nP2,2',e.names,2));assert.throws(()=>drawSlots(8,[0,0]));
const original=JSON.parse(JSON.stringify(e));delete original.roundBest;assert.equal(matchBest(original,original.matches.at(-1)),3);
console.log('PASS: 2–32 entrants / 0,2,4 seeds / 20 draws each; seeds, byes, full progression; mixed-round rules and affected-result clearing; import validation; legacy fallback');
