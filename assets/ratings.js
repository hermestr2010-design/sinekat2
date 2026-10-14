document.addEventListener('DOMContentLoaded',function(){var root=document.getElementById('rt-root');if(!root)return;var TR=window.RT_LANG=='tr',AS=window.RT_IDX.replace(/search-\w+\.json$/,''),G={"DR": ["drama", "Drama", "Dram"], "CO": ["comedy", "Comedy", "Komedi"], "CR": ["crime", "Crime", "Suç"], "TH": ["thriller", "Thriller", "Gerilim"], "MY": ["mystery", "Mystery", "Gizem"], "HO": ["horror", "Horror", "Korku"], "SF": ["sci-fi", "Sci-Fi", "Bilim Kurgu"], "FA": ["fantasy", "Fantasy", "Fantastik"], "AC": ["action", "Action", "Aksiyon"], "AD": ["adventure", "Adventure", "Macera"], "RO": ["romance", "Romance", "Romantik"], "WA": ["war", "War", "Savaş"], "WE": ["western", "Western", "Western"], "MU": ["musical", "Musical", "Müzikal"], "AN": ["animation", "Animation", "Animasyon"], "DO": ["documentary", "Documentary", "Belgesel"], "BI": ["biography", "Biography", "Biyografi"], "HI": ["history", "History", "Tarih"], "FM": ["family", "Family", "Aile"], "NO": ["film-noir", "Film-Noir", "Kara Film"]};
function RTR(root,D,o){
var T=o.T,TR=o.tr,G=o.G,st={mode:'genre',key:'',b:null,n:25};
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/'/g,'&#39;')}
function fm(x,d){var s=x.toFixed(d);return TR?s.replace('.',','):s}
var DEC=[['0',T('Before 1920','1920 öncesi')]].concat([1920,1930,1940,1950,1960,1970,1980,1990,2000,2010,2020].map(function(d){return [''+d,TR?d+"'ler":d+'s']}));
function dk(y){return y<1920?'0':''+(Math.floor(y/10)*10)}
function inG(d,k){if(k==='')return true;return st.mode=='genre'?d.g.indexOf(k)>-1:dk(d.y)===k}
function groups(){return st.mode=='genre'?Object.keys(G).map(function(k){return [k,G[k]]}):DEC}
function sub(k){return D.filter(function(d){return inG(d,k)})}
function stats(a){var r=a.map(function(d){return d.r}).sort(function(x,y){return x-y}),n=r.length;if(!n)return null;var m=r.reduce(function(s,x){return s+x},0)/n,md=n%2?r[(n-1)/2]:(r[n/2-1]+r[n/2])/2;return {n:n,mean:m,med:md,hi:r.filter(function(x){return x>=8}).length}}
function bk(r){return Math.min(9.5,Math.max(4,Math.floor(r*2)/2))}
function draw(){
var A=sub(st.key),S=stats(A),h='';
h+='<div class="rtm"><button class="tnc'+(st.mode=='genre'?' on':'')+'" data-m="genre">'+T('By genre','Türe göre')+'</button><button class="tnc'+(st.mode=='decade'?' on':'')+'" data-m="decade">'+T('By decade','On yıla göre')+'</button>';
h+='<label>'+(st.mode=='genre'?T('Genre','Tür'):T('Decade','On yıl'))+'<select id="rt-k"><option value="">'+T('All films','Tüm filmler')+'</option>'+groups().map(function(g){return '<option value="'+g[0]+'"'+(st.key===g[0]?' selected':'')+'>'+esc(g[1])+'</option>'}).join('')+'</select></label></div>';
h+='<h3 class="rth">'+T('Score distribution','Puan dağılımı')+'</h3>';
if(!S){h+='<p class="rtn">'+T('No rated films here.','Bu grupta puanlı film yok.')+'</p>'}else{
var C=[],i;for(i=0;i<12;i++)C.push(0);A.forEach(function(d){C[Math.round((bk(d.r)-4)*2)]++});var mx=Math.max.apply(null,C);
h+='<p class="rtn">'+S.n+' '+T('films','film')+' · '+T('mean','ortalama')+' '+fm(S.mean,2)+' · '+T('median','medyan')+' '+fm(S.med,1)+' · '+S.hi+' '+T('score 8.0 or higher','film 8,0 veya üzeri')+'</p>';
h+='<div class="rtb" role="img" aria-label="'+T('Histogram of IMDb scores','IMDb puanı histogramı')+'">'+C.map(function(c,i){var v=4+i/2;return '<button class="rtc'+(st.b===v?' on':'')+'" data-b="'+v+'" title="'+fm(v,1)+'–'+fm(v+.4,1)+': '+c+'"><span class="rtv">'+c+'</span><i style="height:'+(mx?Math.max(c?3:0,c/mx*100):0)+'%"></i><span class="rtx">'+fm(v,1)+'</span></button>'}).join('')+'</div>';
h+='<p class="rtn rts">'+T('Click a bar to list its films. Scores are IMDb scores in half-point steps.','Filmleri görmek için bir çubuğa tıklayın. Puanlar IMDb puanıdır, yarım puanlık aralıklarla gösterilir.')+'</p>';
if(st.b!==null){var L=A.filter(function(d){return bk(d.r)===st.b}).sort(function(a,b){return b.v-a.v||a.t.localeCompare(b.t)});
h+='<div class="rtl"><h4>'+fm(st.b,1)+'–'+fm(st.b+.4,1)+' · '+L.length+' '+T('films','film')+'</h4>'+L.slice(0,40).map(row).join('')+(L.length>40?'<p class="rtn">'+T('Showing the 40 with the most votes.','En çok oy alan 40 film gösteriliyor.')+'</p>':'')+'</div>'}}
// averages
var AV=groups().map(function(g){var s=stats(sub(g[0]));return s&&s.n>=5?{k:g[0],n:g[1],m:s.mean,c:s.n}:null}).filter(Boolean).sort(function(a,b){return b.m-a.m});
if(AV.length){var lo=Math.min.apply(null,AV.map(function(x){return x.m}))-.3,hi=Math.max.apply(null,AV.map(function(x){return x.m}));
h+='<h3 class="rth">'+(st.mode=='genre'?T('Average score by genre','Türe göre ortalama puan'):T('Average score by decade','On yıla göre ortalama puan'))+'</h3><div class="rta">'+AV.map(function(x){return '<button class="rtr'+(st.key===x.k?' on':'')+'" data-k="'+x.k+'"><span class="rtl1">'+esc(x.n)+'</span><span class="rtbar"><i style="width:'+Math.max(4,(x.m-lo)/(hi-lo+.3)*100)+'%"></i></span><span class="rtl2">'+fm(x.m,2)+' <small>('+x.c+')</small></span></button>'}).join('')+'</div>'}
// underrated
var U=A.filter(function(d){return d.v>=1000&&d.v<25000&&d.r>=7.5}).sort(function(a,b){return b.r-a.r||a.v-b.v||a.t.localeCompare(b.t)});
h+='<h3 class="rth">'+T('Most underrated','En az bilinen başyapıtlar')+'</h3><p class="rtn">'+T('High score, few votes: films rated 7.5 or higher with fewer than 25,000 IMDb votes (the cut-off for the Top 500), best score first.','Yüksek puan, az oy: 7,5 ve üzeri puanlı, 25.000’den az IMDb oyu almış filmler (Top 500 için gereken oy sınırının altında), en yüksek puandan başlayarak.')+'</p>';
h+=U.length?'<div class="rtl">'+U.slice(0,st.n).map(function(d,i){return row(d,i+1)}).join('')+'</div>'+(U.length>st.n?'<div class="mw"><button class="more" id="rt-more">'+T('Show more','Daha fazla göster')+' ('+(U.length-st.n)+')</button></div>':''):'<p class="rtn">'+T('Nothing qualifies in this group.','Bu grupta uygun film yok.')+'</p>';
root.innerHTML=h}
function row(d,i){return '<a class="rtf" href="'+d.h+'">'+(i?'<b>'+i+'</b>':'')+'<span class="rtt">'+esc(d.t)+' <small>'+d.y+' · '+esc(d.d)+'</small></span><span class="rtsc">★ '+fm(d.r,1)+' <small>'+d.v.toLocaleString(TR?'tr-TR':'en-US')+' '+T('votes','oy')+'</small></span></a>'}
root.addEventListener('click',function(e){var b=e.target.closest('[data-m],[data-b],[data-k],#rt-more');if(!b)return;if(b.hasAttribute('data-m')){st.mode=b.getAttribute('data-m');st.key='';st.b=null;st.n=25}else if(b.hasAttribute('data-b')){var v=parseFloat(b.getAttribute('data-b'));st.b=st.b===v?null:v}else if(b.hasAttribute('data-k')){st.key=b.getAttribute('data-k');st.b=null;st.n=25;var y=window.scrollY;draw();window.scrollTo(0,0);return}else st.n+=25;var y2=window.scrollY;draw();window.scrollTo(0,y2)});
root.addEventListener('change',function(e){if(e.target.id=='rt-k'){st.key=e.target.value;st.b=null;st.n=25;draw()}});
draw()}

root.innerHTML='<p class="rtn">…</p>';fetch(AS+'pick.json').then(function(x){return x.json()}).then(function(j){var D=[];j.forEach(function(f){if(!(f[5]>0)||f[1]=='Tosun Paşa')return;D.push({t:f[1],y:f[2],d:f[3],r:f[5],v:f[6],g:f[7].split(',').filter(Boolean),h:window.RT_BASE+'films/'+f[0]+'.html'})});var GG={};Object.keys(G).forEach(function(k){GG[k]=G[k][TR?2:1]});RTR(root,D,{T:function(a,b){return TR?b:a},tr:TR,G:GG})})});