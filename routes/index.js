const combineRouters = require('koa-combine-routers');
const ping = require('./ping');
const addRouter = require('./instances/add');
const deleteRouter = require('./instances/delete');
const sseRouter = require('./sse');
const stateChangeRouter = require('./instances/stateChange');

const router = combineRouters(
  ping,
  addRouter,
  deleteRouter,
  sseRouter,
  stateChangeRouter,
);

module.exports = router;
