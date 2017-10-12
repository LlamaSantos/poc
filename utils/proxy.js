const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({ ws: true })
const apiExpr = /\/api/i

const info = console.info.bind(console, 'proxy')

const server = http.createServer((req, res) => {
  if (req.url.match(apiExpr)) {
    info('matched', 'api', req.url)
    req.url = req.url.replace('/api', '')
    proxy.web(req, res, { target: `http://localhost:8001`, prependPath: false, ws: true })
  }
  else {
    info('matched', 'web', req.url)
    proxy.web(req, res, { target: `http://localhost:3000` });
  }
});

info("listening...")
server.on('upgrade', (req, socket, head) => proxy.ws(req, socket, head, { target: `ws://localhost:3000`, ws: true }))
server.on('error', (...args) => info('error', ...args))
server.listen(8000)