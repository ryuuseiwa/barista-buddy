const CACHE='barista-buddy-shell-v1';
const FILES=['./','./index.html','./styles.css','./app.js','./core.js','./ai-worker.js','./vendor/transformers.min.js','./vendor/ort-wasm-simd-threaded.jsep.mjs','./vendor/ort-wasm-simd-threaded.jsep.wasm'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('barista-buddy-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
  event.respondWith((async()=>{const cache=await caches.open(CACHE);try{const response=await fetch(event.request);if(response.ok&&!response.redirected&&(response.headers.get('content-type')||'').indexOf('text/html')<0){event.waitUntil(cache.put(event.request,response.clone()))}return response}catch(error){const saved=await cache.match(event.request);if(saved)return saved;if(event.request.mode==='navigate'){const shell=await cache.match('./index.html');if(shell)return shell}throw error}})());
});
