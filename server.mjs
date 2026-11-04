import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const port = Number(process.argv[2] || 4174);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.webp': 'image/webp', '.png': 'image/png', '.ico': 'image/x-icon', '.svg': 'image/svg+xml', '.ttf': 'font/ttf' };
createServer(async (request, response) => {
  try {
    const path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const publicPath = path === '/' ? 'index.html' : path.replace(/^\/+/, '');
    if (path.split('/').some(part => part.startsWith('.')) || !/^(index\.html|styles\.css|refinements\.css|app\.js|assets\/[\w.-]+)$/.test(publicPath)) {
      response.writeHead(404); response.end('Not found'); return;
    }
    const target = resolve(root, publicPath);
    if (!target.startsWith(root + sep)) { response.writeHead(403); response.end('Forbidden'); return; }
    const data = await readFile(target);
    response.writeHead(200, { 'Content-Type': types[extname(target)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    response.end(request.method === 'HEAD' ? undefined : data);
  } catch { response.writeHead(404); response.end('Not found'); }
}).listen(port, '127.0.0.1', () => console.log(`Food for Hustlers preview: http://127.0.0.1:${port}`)).on('error', error => {
  console.error(error.code === 'EADDRINUSE' ? `Port ${port} is in use. Try: node server.mjs ${port + 1}` : error.message);
  process.exitCode = 1;
});
