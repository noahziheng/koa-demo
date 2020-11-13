const Koa = require('koa');
const qs = require('querystring');
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

const parsePostBody = (ctx) => {
  return new Promise((resolve, reject) => {
    try {
      let bodyData = "";
      ctx.req.addListener('data', (data) => {
        bodyData += data
      })
      ctx.req.addListener("end",function(){
        let parsedData = null;
        console.log('ctx.req.headers', ctx.req.headers);
        if (ctx.req.headers['content-type'] === 'application/json') {
          parsedData = JSON.parse(bodyData);
        } else if (ctx.req.headers['content-type'] === 'application/ x-www-form-urlencoded') {
          parsedData = qs.parse(decodeURIComponent(bodyData));
        }
        console.log('parsedData', parsedData);
        console.log('bodyData', bodyData);
        resolve(parsedData);
      })
    } catch ( err ) {
      reject(err)
    }
  })
}

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

app.use(route('POST', '/api/todo', async (ctx) => {
  // 新增 Todo 项
  const item = await parsePostBody(ctx);
  console.log(ctx.request.body);
  ctx.body = dataModel.createItem(item);
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