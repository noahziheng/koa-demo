const Koa = require('koa');
const serve = require('koa-static');

const app = new Koa();

app.use(serve('./public'));

app.use(ctx => {
  ctx.body = 'Hello Koa';
});

app.listen(3000);