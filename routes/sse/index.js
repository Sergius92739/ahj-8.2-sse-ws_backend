const Router = require('koa-router');
const { streamEvents } = require('http-event-stream');
const dataBase = require('../../api/dataBase');
const router = new Router();
const { v4: uuidv4 } = require('uuid');

router.get('/sse', async (ctx) => {
  streamEvents(ctx.req, ctx.res, {
    async fetch(lastEventId) {
      console.log(lastEventId);
      return [];
    },
    stream(sse) {
      function sendNotification(notification) {
        sse.sendEvent({
          data: JSON.stringify(notification),
          id: uuidv4(),
        });
        console.log('Уведомление отправлено:', notification);
      }

      function sendInstanceData(id, callback) {
        const data = callback.call(dataBase, id);
        sse.sendEvent({
          data: JSON.stringify(data),
          id,
        });
        console.log('Инстанс отправлен:', data);
      }

      dataBase.listen(sendInstanceData, sendNotification);
      
      console.log('sse: ok');

      return () => { };
    }
  });

  ctx.respond = false;
});

module.exports = router;
