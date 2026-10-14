(function(){document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('.rnd');if(!a||!window.RT_IDX)return;e.preventDefault();fetch(window.RT_IDX.replace(/search-\w+\.json$/,'pick.json')).then(function(x){return x.json()}).then(function(L){var f=L[Math.floor(Math.random()*L.length)];location.href=window.RT_BASE+'films/'+f[0]+'.html'})})})();
(function(){var q=document.getElementById('q'),r=document.getElementById('qr'),idx=null,busy=false;if(!q)return;
function nrm(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/ı/g,'i')}
function load(cb){if(idx)return cb();if(busy)return;busy=true;fetch(window.RT_IDX).then(function(x){return x.json()}).then(function(j){idx=j.map(function(e){e.n=nrm(e[1]+(e[4]?' '+e[4]:''));return e});cb()}).catch(function(){busy=false})}
q.addEventListener('input',function(){var v=nrm(q.value.trim());if(v.length<2){r.hidden=true;return}load(function(){var out=[];for(var i=0;i<idx.length&&out.length<14;i++){if(idx[i].n.indexOf(v)>-1)out.push(idx[i])}
r.innerHTML=out.map(function(e){return '<a href="'+window.RT_BASE+e[2]+'">'+e[1].replace(/&/g,'&amp;').replace(/</g,'&lt;')+'<small>'+e[3]+'</small></a>'}).join('')||'';r.hidden=!out.length})});
document.addEventListener('click',function(e){if(!r.contains(e.target)&&e.target!==q)r.hidden=true})})();
