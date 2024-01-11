import createBareServer from '@tomphttp/bare-server-node';
import { fileURLToPath } from "url";
import { createServer as createHttpsServer } from "node:https";
import { createServer as createHttpServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import serveStatic from "serve-static";
import { json } from "body-parser";
import admin from 'firebase-admin';
import serviceAccount from '/static/api/firebase-adminSDK.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const bare = createBareServer("/bare/");
const serve = serveStatic(fileURLToPath(new URL("../static/", import.meta.url)), {
  fallthrough: false
});
const server = existsSync("../ssl/key.pem") && existsSync("../ssl/cert.pem") ?
  createHttpsServer({
    key: readFileSync("../ssl/key.pem"),
    cert: readFileSync("../ssl/cert.pem")
  }) :
  createHttpServer();

server.use(json());

server.post('/auth', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await admin.auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    res.json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) bare.routeRequest(req, res);
  else {
    serve(req, res, (err) => {
      res.writeHead(err?.statusCode || 500, null, {
        "Content-Type": "text/plain",
      });
      res.end('Error')
    })
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req, socket, head)) bare.routeUpgrade(req, socket, head);
  else socket.end();
});

server.on('listening', () => {
  const addr = server.address();
  console.log(`Server running on port ${addr.port}\n`)
  console.log(`Local: http://${addr.family === 'IPv6' ? `[${addr.address}]` : addr.address}:${addr.port}`);
  try {
    console.log(`On Your Network: http://localhost:${addr.port}`);
  } catch (err) {};
  if (process.env.REPL_SLUG && process.env.REPL_OWNER) console.log(
    `Replit: https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`);
});

server.listen({
  port: (process.env.PORT || 8080)
});
