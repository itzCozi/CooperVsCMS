importScripts('/uv/uv.sw.js');
const sw = new UVServiceWorker();

// This is entry point put auth script here

self.addEventListener('fetch', event => {
	event.respondWith(sw.fetch(event));
});