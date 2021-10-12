const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const router = require('./routes');

const app = new Koa();
const port = process.env.PORT || 7070;

app.use(koaBody({
  urlencoded: true,
  multipart: true,
  json: true,
}));

// Cors
app.use(cors());

app.use(router());

const server = http.createServer(app.callback());
server.listen(port);
console.log(`server is started on port ${port}`);
console.log('http://localhost:7070')
