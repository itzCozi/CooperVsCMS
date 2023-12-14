// Run auth-script before link access
var auth_script = require("../auth/auth-script.js");
auth_script.auth_function();

importScripts('/uv/uv.sw.js');
const sw = new UVServiceWorker();

self.addEventListener('fetch', event => {
	event.respondWith(sw.fetch(event));
});
