importScripts('/uv/uv.sw.js');
const sw = new UVServiceWorker();

console.log('uv/service called')

self.addEventListener('fetch', event => {
	event.respondWith(sw.fetch(event));
});
