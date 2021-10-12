const Router = require('koa-router');
const router = new Router();
const EventInform = require('../../../api/EventInform');
const dataBase = require('../../../api/dataBase');

router.post('/instances/stateChange', async (ctx) => {
  try {
    const { id, command } = ctx.request.body;
    dataBase.handlers.notification(new EventInform(id, EventInform.info[command][0]));
    setTimeout(() => {
      dataBase.handlers.notification(new EventInform(id, EventInform.info[command][1]));
      dataBase.handlers.instanceData(id, dataBase.stateChange.bind(dataBase, id, command));
    }, 20000);
    
    ctx.response.body = { success: true };
  }
  catch (err) {
    console.log(err);
    ctx.response.status = 501;
    ctx.response.body = { success: false, error: err.masage };
  }
});

module.exports = router;
