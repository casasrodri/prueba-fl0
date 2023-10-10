import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import sessionMiddleware from './session.js';
import consoleActivity from './console.js';

const configCors = {
    origin: true, // Cambia esto a la URL de tu aplicación Vue.js
    credentials: true, // Habilita el intercambio de cookies
};

export default (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(sessionMiddleware);
    app.use('/', express.static(process.cwd() + '/public/dist'));
    app.use('/public', express.static(process.cwd() + '/public'));
    app.use(consoleActivity({ ip: false, color: true, body: true }));
    app.use(cookieParser());
    app.use(cors(configCors));
};
