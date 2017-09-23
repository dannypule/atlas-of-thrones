/**
 * API Routes Module
 */

const Router = require('koa-router');
const database = require('./database');
// const cache = require('./cache');
// const joi = require('joi');
// const validate = require('koa-joi-validate');

const router = new Router();

// hello world endpoint
router.get('/hello', async ctx => {
  ctx.body = 'hello world';
});

router.get('/time', async ctx => {
  const result = await database.queryTime();
  ctx.body = result;
});

// response with geojson data for the requested type
router.get('/locations/:type', async ctx => {
  const type = ctx.params.type;
  const results = await database.getLocations(type);

  if (!results || results.length === 0) {
    ctx.throw(404);
  }

  // add row metadata as geojson properties
  const locations = results.map(row => {
    let geojson = JSON.parse(row.st_asgeojson);
    geojson.properties = { name: row.name, type: row.type, id: row.gid };
    return geojson;
  });

  ctx.body = locations;
});

// respond with boundary geojson for all kingdoms
router.get('/kingdoms', async ctx => {
  const results = await database.getKingdomBoundaries();

  if (!results || results.length === 0) {
    ctx.throw(404);
  }

  // add row metadata as geojson properties
  const boundaries = results.map(row => {
    let geojson = JSON.parse(row.st_asgeojson);
    geojson.properties = { name: row.name, id: row.gid };
    return geojson;
  });

  ctx.body = boundaries;
});

module.exports = router;
