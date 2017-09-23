# Atlas-Of-Thrones

An interactive "Game of Thrones" map powered by Leaflet, PostGIS, and Redis. From the brilliant blog post at https://blog.patricktriest.com/game-of-thrones-map-node-postgres-redis/

#### Structure
- `app/` - The front-end web application source.
- `public/` - The compiled and minified front-end code.
- `server/` - The Node.js API server code.
- `setup/` - A collection of scripts to download the shapefiles and setup the postgresql database.

#### Setup

To setup the project, simply download or clone the project to your local machine and `npm install`.

The only extra step is adding a `.env` file in order to properly initialize the required environment variables.

Here's an example `.env` file with sensible defaults for local development -
```
PORT=5000
DATABASE_URL=postgres://dannyp_admin@localhost:5432/atlas_of_thrones?ssl=false
REDIS_HOST=localhost
REDIS_PORT=6379
CORS_ORIGIN=http://localhost:8080
```

You'll need to change the username in the DATABASE_URL entry to match your Postgres user credentials.


Run `npm run local` to start the API server on `localhost:5000`, and to build/watch/serve the frontend code from `localhost:8080`.