import usuariosRouter from './usuarios.js';
import cocherasRotuer from './cocheras.js';
import vehiculosRotuer from './vehiculos.js';
import publicacionesRotuer from './publicaciones.js';
import sesionesRotuer from './sesiones.js';
import conversacionesRotuer from './conversaciones.js';
import jwtRouter from './jwt.js';

export default (app) => {
    app.use('/api/usuarios', usuariosRouter);
    app.use('/api/jwt', jwtRouter);
    app.use('/api/cocheras', cocherasRotuer);
    app.use('/api/vehiculos', vehiculosRotuer);
    app.use('/api/publicaciones', publicacionesRotuer);
    app.use('/api/sesiones', sesionesRotuer);
    app.use('/api/conversaciones', conversacionesRotuer);

    // fallback o catch-all
    app.get('*', (req, res) => {
        res.sendFile('./public/dist/index.html', { root: '.' });
    });
};
