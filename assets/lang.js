/* Sinekatalog language chooser. Turkish is the default (site root); English lives under /en/.
   Visitors outside Turkey are sent to English once; their own choice in the menu always wins. */
(function () {
  var cur = document.documentElement.lang === 'en' ? 'en' : 'tr', alt = window.SK_ALT;
  if (!alt) return;
  var other = cur === 'tr' ? 'en' : 'tr';
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function sget(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function sset(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  // 1. the visitor's own choice (made with the flag in the menu) always wins
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a.lg');
    if (a) set('sk_lang', other);
  }, true);
  var pref = get('sk_lang');
  if (pref === 'tr' || pref === 'en') { if (pref !== cur) location.replace(alt); return; }
  // 2. search-engine and social bots see the page as it is
  if (/bot|crawl|spider|slurp|bing|facebookexternalhit|preview|lighthouse/i.test(navigator.userAgent)) return;
  // 3. otherwise decide by the visitor's country
  function decide(cc) {
    cc = (cc || '').toUpperCase();
    if (!/^[A-Z]{2}$/.test(cc)) return fallback();
    sset('sk_cc', cc);
    var want = cc === 'TR' ? 'tr' : 'en';
    if (want !== cur) location.replace(alt);
  }
  function fallback() {
    var tz = '', lg = (navigator.language || '').toLowerCase();
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
    var want = (/Istanbul/i.test(tz) || lg.indexOf('tr') === 0) ? 'tr' : 'en';
    if (want !== cur) location.replace(alt);
  }
  var cached = sget('sk_cc');
  if (cached) return decide(cached);
  function T(url, ms) {
    var c = window.AbortController ? new AbortController() : null, t = c && setTimeout(function () { c.abort(); }, ms);
    return fetch(url, c ? { signal: c.signal, cache: 'no-store' } : { cache: 'no-store' }).then(function (r) {
      if (t) clearTimeout(t); if (!r.ok) throw 0; return r;
    });
  }
  // the site's own host first (works behind Cloudflare), then two public country lookups
  T('/cdn-cgi/trace', 1500).then(function (r) { return r.text(); }).then(function (t) {
    var m = /loc=([A-Z]{2})/.exec(t); if (!m) throw 0; decide(m[1]);
  }).catch(function () {
    return T('https://get.geojs.io/v1/ip/country.json', 2500).then(function (r) { return r.json(); }).then(function (j) { decide(j.country); });
  }).catch(function () {
    return T('https://ipapi.co/country/', 2500).then(function (r) { return r.text(); }).then(decide);
  }).catch(fallback);
})();
