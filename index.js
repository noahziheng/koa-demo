const Koa = require('koa');
const serve = require('koa-static');
const dataModel = require('./data');

const app = new Koa();

const route = (method, url, handlerFn) => {
  return async (ctx, next) => {
    // Url is /api/todos or /api/todo?i=1
    if (ctx.request.method === method && ctx.request.url.includes(url)) {
      await handlerFn(ctx, next);
    } else {
      await next();
    }
  };
};

app.use(serve('./public'));

app.use(route('GET', '/api/todos', (ctx) => {
  // 获取 Todo 项列表
  ctx.body = dataModel.getList();
}));

app.use(route('GET', '/api/todo', (ctx) => {
  // 获取 Todo 项
  const { i } = ctx.request.query;
  ctx.body = dataModel.getItem(i);
}));

app.use(route('POST', '/api/todo', (ctx) => {
  // 新增 Todo 项
  const item = ctx.body;
  ctx.body = dataModel.getItem(item);
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