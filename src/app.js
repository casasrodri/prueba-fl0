import express from 'express';
import mongoConnect from './database/mongo.js';
import setMiddlewares from './middlewares/index.js';
import setRouters from './routes/index.js';
import setSockets from './sockets/index.js';

// Conexión con Mongo Atlas
mongoConnect();

const app = express();
const PORT = 8080;

// HTTP Server
const httpServer = app.listen(PORT, () => {
    console.log(`🚀 HTTP server disponible en http://localhost:${PORT}`);
});

// Middlewares
setMiddlewares(app);

// Routers
setRouters(app);

// Sockets
setSockets(httpServer);

import PublicacionManager from './controllers/publicaciones.js';

const pm = new PublicacionManager();

const pr = async () => {};
pr();
