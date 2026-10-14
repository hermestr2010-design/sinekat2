document.addEventListener('DOMContentLoaded',function(){var root=document.getElementById('ls-root');if(!root)return;var TR=window.RT_LANG=='tr',AS=window.RT_IDX.replace(/search-\w+\.json$/,'');
function LSR(root,P,o){
var T=o.T,TR=o.tr,AS=o.AS,BASE=o.BASE,MAX=10,by={},st={t:'',f:[],edit:true,q:''};
P.forEach(function(f){by[f[1]]=f});
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/'/g,'&#39;').replace(/"/g,'&quot;')}
function nrm(s){return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/ı/g,'i').replace(/ß/g,'ss')}
function parse(){var h=location.hash.replace(/^#/,''),r={t:'',f:[]};h.split('&').forEach(function(kv){var i=kv.indexOf('=');if(i<0)return;var k=kv.slice(0,i),v=kv.slice(i+1);try{if(k=='t')r.t=decodeURIComponent(v);else if(k=='f')r.f=v.split(',').filter(Boolean).map(decodeURIComponent)}catch(e){}});r.f=r.f.filter(function(t){return by[t]}).slice(0,MAX);return r}
function frag(){return '#t='+encodeURIComponent(st.t)+'&f='+st.f.map(encodeURIComponent).join(',')}
function sync(){try{history.replaceState(null,'',st.f.length||st.t?frag():location.pathname+location.search)}catch(e){}try{localStorage.setItem('reel_list_draft',JSON.stringify({t:st.t,f:st.f}))}catch(e){}}
function title(){return st.t||T('My top '+(st.f.length||10),'En sevdiğim '+(st.f.length||10)+' film')}
function row(i){var f=by[st.f[i]];return f}
function draw(){st.edit?drawEdit():drawView()}
function drawEdit(){var h='<div class="lsw"><label>'+T('List title','Liste başlığı')+'<input type="text" id="ls-t" maxlength="60" placeholder="'+T('My top 10 of 2025','2025’in en iyi 10 filmi')+'" value="'+esc(st.t)+'"></label>';
h+='<label>'+T('Add films ('+st.f.length+'/'+MAX+')','Film ekle ('+st.f.length+'/'+MAX+')')+'<input type="search" id="ls-q" placeholder="'+T('Search the catalogue…','Katalogda ara…')+'" autocomplete="off" value="'+esc(st.q)+'"></label><div class="lsres" id="ls-res"></div>';
h+='<ol class="lso">'+st.f.map(function(t,i){var f=by[t];return '<li class="lsi"><b>'+(i+1)+'</b><span>'+esc(t)+' <small>'+f[2]+' · '+esc(f[3])+'</small></span><button data-up="'+i+'" aria-label="up"'+(i?'':' disabled')+'>↑</button><button data-dn="'+i+'" aria-label="down"'+(i<st.f.length-1?'':' disabled')+'>↓</button><button data-rm="'+i+'" aria-label="remove">✕</button></li>'}).join('')+'</ol>';
h+='<div class="lsb"><button class="pri" id="ls-show"'+(st.f.length?'':' disabled')+'>'+T('Show my card','Kartımı göster')+'</button></div></div>';
root.innerHTML=h;res()}
function res(){var el=document.getElementById('ls-res');if(!el)return;var q=nrm(st.q.trim());if(q.length<2){el.innerHTML='';return}
var M=P.filter(function(f){return nrm(f[1]).indexOf(q)>-1}).sort(function(a,b){return (b[6]||0)-(a[6]||0)}).slice(0,8);
el.innerHTML=M.map(function(f){var on=st.f.indexOf(f[1])>-1||st.f.length>=MAX;return '<button data-add="'+esc(f[1])+'"'+(on?' disabled':'')+'><span>'+esc(f[1])+' <small>'+f[2]+' · '+esc(f[3])+'</small></span><span>+</span></button>'}).join('')||'<p class="rtn">'+T('No films found.','Film bulunamadı.')+'</p>'}
function link(){return location.origin+location.pathname+frag()}
function drawView(){var n=st.f.length,h='<div class="lcard" id="lcard"><div class="yr">Sinekatalog</div><h2>'+esc(title())+'</h2><p class="lsub">'+n+' '+T('films, ranked','film, sıralı')+'</p><div class="lgr">';
st.f.forEach(function(t,i){var f=by[t];h+='<a href="'+BASE+'films/'+f[0]+'.html"><span class="lr">'+(i+1)+'</span>'+(f[9]?'<img alt="" loading="lazy" src="'+AS+'posters/'+f[0]+'.jpg" onerror="this.outerHTML=\'<span class=lnp></span>\'">':'<span class="lnp"></span>')+'<span class="lt">'+esc(t)+'<small>'+f[2]+' · '+esc(f[3])+'</small></span></a>'});
h+='</div><p class="lft">'+T('Made with Sinekatalog','Sinekatalog ile hazırlandı')+'</p></div><div class="lsb"><button class="pri" id="ls-copy">'+T('Copy link','Bağlantıyı kopyala')+'</button><button id="ls-img">'+T('Save as image','Görsel olarak kaydet')+'</button>'+(navigator.share?'<button id="ls-share">'+T('Share','Paylaş')+'</button>':'')+'<button id="ls-edit">'+T('Edit list','Listeyi düzenle')+'</button><a href="'+location.pathname+'" id="ls-new">'+T('Start a new list','Yeni liste')+'</a></div><p class="lsk" id="ls-link">'+esc(link())+'</p>';
root.innerHTML=h}
function flash(id,txt){var b=document.getElementById(id);if(!b)return;var o=b.textContent;b.textContent=txt;setTimeout(function(){b.textContent=o},1500)}
function wrap(c,s,x,y,w,lh,max){var W=s.split(' '),l='',n=0;for(var i=0;i<W.length;i++){var t=l?l+' '+W[i]:W[i];if(c.measureText(t).width>w&&l){c.fillText(l,x,y+n*lh);n++;l=W[i];if(n>=max-1){var rest=W.slice(i).join(' ');while(c.measureText(rest+'…').width>w&&rest.length>1)rest=rest.slice(0,-1);c.fillText(rest+(rest.length<W.slice(i).join(' ').length?'…':''),x,y+n*lh);return n+1}}else l=t}c.fillText(l,x,y+n*lh);return n+1}
function img(src){return new Promise(function(r){var i=new Image();i.onload=function(){r(i)};i.onerror=function(){r(null)};i.src=src})}
function image(){var n=st.f.length,rows=Math.ceil(n/2),W=1080,hd=210,ch=250,H=hd+rows*ch+90,cv=document.createElement('canvas');cv.width=W;cv.height=H;var c=cv.getContext('2d');
return Promise.all(st.f.map(function(t){var f=by[t];return f[9]?img(AS+'posters/'+f[0]+'.jpg'):Promise.resolve(null)})).then(function(I){
c.fillStyle='#f5f0e6';c.fillRect(0,0,W,H);c.fillStyle='#a9701c';c.fillRect(0,0,W,12);
c.fillStyle='#a9701c';c.font='600 26px system-ui,Arial,sans-serif';c.fillText('SINEKATALOG',60,70);
c.fillStyle='#1c1a17';c.font='700 56px Georgia,serif';var tt=title();while(c.measureText(tt).width>W-120&&tt.length>4){tt=tt.slice(0,-2)}c.fillText(tt+(tt!=title()?'…':''),60,140);
c.fillStyle='#6b645a';c.font='400 26px system-ui,Arial,sans-serif';c.fillText(n+' '+T('films, ranked','film, sıralı'),60,182);
st.f.forEach(function(t,i){var f=by[t],col=i%2,rw=Math.floor(i/2),x=60+col*500,y=hd+rw*ch+10;
c.fillStyle='#a9701c';c.font='700 54px Georgia,serif';c.textAlign='center';c.fillText(String(i+1),x+28,y+110);c.textAlign='left';
var px=x+66,pw=130,ph=195;c.fillStyle='#d8cfbd';c.fillRect(px,y,pw,ph);if(I[i])c.drawImage(I[i],px,y,pw,ph);
c.fillStyle='#1c1a17';c.font='700 27px system-ui,Arial,sans-serif';var ln=wrap(c,t,px+pw+18,y+34,250,32,3);
c.fillStyle='#6b645a';c.font='400 22px system-ui,Arial,sans-serif';c.fillText(String(f[2]),px+pw+18,y+34+ln*32+6);var d=f[3];while(c.measureText(d).width>250&&d.length>3)d=d.slice(0,-2);c.fillText(d,px+pw+18,y+34+ln*32+34)});
c.fillStyle='#8a8272';c.font='400 22px system-ui,Arial,sans-serif';c.fillText(T('Made with Sinekatalog','Sinekatalog ile hazırlandı'),60,H-34);
return new Promise(function(r){cv.toBlob(r,'image/png')})})}
root.addEventListener('input',function(e){if(e.target.id=='ls-t'){st.t=e.target.value;sync()}else if(e.target.id=='ls-q'){st.q=e.target.value;res()}});
root.addEventListener('click',function(e){var b=e.target.closest('button,a');if(!b)return;
if(b.hasAttribute('data-add')){var t=b.getAttribute('data-add');if(st.f.indexOf(t)<0&&st.f.length<MAX){st.f.push(t);st.q='';sync();draw();var q=document.getElementById('ls-q');if(q)q.focus()}}
else if(b.hasAttribute('data-up')){var i=+b.getAttribute('data-up');if(i>0){var x=st.f[i];st.f[i]=st.f[i-1];st.f[i-1]=x;sync();draw()}}
else if(b.hasAttribute('data-dn')){var i2=+b.getAttribute('data-dn');if(i2<st.f.length-1){var y=st.f[i2];st.f[i2]=st.f[i2+1];st.f[i2+1]=y;sync();draw()}}
else if(b.hasAttribute('data-rm')){st.f.splice(+b.getAttribute('data-rm'),1);sync();draw()}
else if(b.id=='ls-show'){st.edit=false;sync();draw();window.scrollTo(0,0)}
else if(b.id=='ls-edit'){st.edit=true;draw()}
else if(b.id=='ls-new'){e.preventDefault();st={t:'',f:[],edit:true,q:''};sync();draw()}
else if(b.id=='ls-copy'){var L=link();var done=function(){flash('ls-copy',T('Copied!','Kopyalandı!'))};if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(L).then(done,function(){sel()});else sel()}
else if(b.id=='ls-img'){image().then(function(bl){var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='sinekatalog-list.png';document.body.appendChild(a);a.click();a.remove()})}
else if(b.id=='ls-share'){image().then(function(bl){var fl=new File([bl],'sinekatalog-list.png',{type:'image/png'});var d={title:title(),url:link()};if(navigator.canShare&&navigator.canShare({files:[fl]}))d.files=[fl];navigator.share(d).catch(function(){})})}});
function sel(){var el=document.getElementById('ls-link');if(el){var r=document.createRange();r.selectNodeContents(el);var s=getSelection();s.removeAllRanges();s.addRange(r)}}
function init(){var h=parse();if(h.f.length||h.t){st.t=h.t;st.f=h.f;st.edit=!h.f.length}else{try{var d=JSON.parse(localStorage.getItem('reel_list_draft')||'null');if(d){st.t=d.t||'';st.f=(d.f||[]).filter(function(t){return by[t]}).slice(0,MAX)}}catch(e){}}draw()}
window.addEventListener('hashchange',function(){var h=parse();if(h.f.length&&frag()!=('#t='+encodeURIComponent(st.t)+'&f='+st.f.map(encodeURIComponent).join(','))){st.t=h.t;st.f=h.f;st.edit=false;draw()}});
init()}

root.innerHTML='<p class="rtn">…</p>';fetch(AS+'pick.json').then(function(x){return x.json()}).then(function(j){LSR(root,j,{T:function(a,b){return TR?b:a},tr:TR,AS:AS,BASE:window.RT_BASE})})});