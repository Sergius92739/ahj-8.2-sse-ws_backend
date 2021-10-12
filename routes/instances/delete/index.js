const Router = require('koa-router');
const router = new Router();
const EventInform = require('../../../api/EventInform');
const dataBase = require('../../../api/dataBase');

router.delete('/instances/delete/:id/:command', async (ctx) => {
  try {
    const { id, command } = ctx.params;
    dataBase.handlers.notification(new EventInform(id, EventInform.info[command][0]));

    setTimeout(() => {
      dataBase.handlers.notification(new EventInform(id, EventInform.info[command][1]));
      dataBase.handlers.instanceData(id, dataBase.delete);
    }, 20000);

    ctx.response.body = { success: true };
  }
  catch (err) {
    console.log(err);
    ctx.response.status = 501;
    ctx.response.body = { success: false, error: err.mesage };
  }
});

module.exports = router;
