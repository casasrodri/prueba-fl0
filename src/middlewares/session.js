import MongoStore from 'connect-mongo';
import session from 'express-session';

import { MONGO_DB_URI } from '../database/mongo.js';

export default session({
    store: MongoStore.create({
        mongoUrl: MONGO_DB_URI,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 1 * 60 * 60, // 1 hora de sesión (en segundos)
    }),
    secret: 'sasaCogirdoRnairdA',
    resave: false,
    saveUninitialized: false,
    // sameSite: 'none',
    // methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // cookie: {},
    cookie: {
        // secure: false,
        // maxAge: 3600000, // Duración de la cookie de sesión en milisegundos (1 hora en este ejemplo)
    },
    // 3600000
});
