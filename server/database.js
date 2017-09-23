/**
 * Postgres DB Module
 */

const postgres = require('pg');
const log = require('./logger');

const connectionString = process.env.DATABASE_URL;

// initialise postgres client
const client = new postgres.Client({ connectionString });

// connect to the db
client
  .connect()
  .then(() => {
    log.info(`Connected to ${client.database} at ${client.host}:${client.port}`);
  })
  .catch(log.error);

module.exports = {
  // query the current time
  queryTime: async () => {
    const result = await client.query(`SELECT NOW() as now`);
    return result.rows[0];
  },

  // query the locations as geojson for the given type
  getLocations: async type => {
    const locationQuery = `
      SELECT ST_AsGeoJson(geog), name, type, gid
      FROM locations
      WHERE UPPER(type) = UPPER($1);
    `;
    const result = await client.query(locationQuery, [type]); // inserting type like this will allow the Postgres to sanitize the "type" input and prevent SQL injection attacks
    return result.rows;
  },

  // query the kingdom boundaries
  getKingdomBoundaries: async () => {
    const boundaryQuery = `
      SELECT ST_AsGeoJson(geog), name, gid
      FROM kingdoms;
    `;
    const results = await client.query(boundaryQuery);

    return results.rows;
  }
};
