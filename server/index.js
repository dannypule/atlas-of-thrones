/**
 * Main Server Index File
 */

const Koa = require('koa');
const cors = require('kcors');
const log = require('./logger');
const api = require('./api');

// setup koa app
const app = new Koa();
const port = process.env.PORT || 5000;

// apply cors config
const origin = process.env.CORS_ORIGIN | '*';
app.use(cors({ origin }));

app.use(async (ctx, next) => {
  const start = Date.now();
  await next(); // This will pause this function until the endpoint handler has resolved
  const responseTime = Date.now() - start;
  log.info(`${ctx.method} ${ctx.status} ${ctx.url} - ${responseTime} ms`);
});

// error handler - all uncaught exceptions will percolate up to here
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    log.error(`Request Error ${ctx.url} - ${err.message}`);
  }
});

// mount routes
app.use(api.routes(), api.allowedMethods());

// start the app
app.listen(port, () => {
  log.info(`Server listening at port ${port}`);
});
