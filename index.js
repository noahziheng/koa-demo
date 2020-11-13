const Koa = require('koa');
const serve = require('koa-static');

const app = new Koa();

const route = (method, url, handlerFn) => {
  return async (ctx, next) => {
    if (ctx.request.method === method && ctx.request.url === url) {
      await handlerFn(ctx, next);
    } else {
      await next();
    }
  };
};

app.use(serve('./public'));

app.use(route('GET', '/api/todos', (ctx) => {
  // 获取 Todo 项列表
  ctx.body = 'GET /api/todos';
}));

app.use(route('GET', '/api/todo', (ctx) => {
  // 获取 Todo 项
  ctx.body = 'GET /api/todo';
}));

app.use(route('POST', '/api/todo', (ctx) => {
  // 新增 Todo 项
  ctx.body = 'POST /api/todo';
}));

app.use(route('PATCH', '/api/todo', (ctx) => {
  // 更新 Todo 项
  ctx.body = 'PATCH /api/todo';
}));

app.use(route('DELETE', '/api/todo', (ctx) => {
  // 删除 Todo 项
  ctx.body = 'DELETE /api/todo';
}));

app.listen(3000);