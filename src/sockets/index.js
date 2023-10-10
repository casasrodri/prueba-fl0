import { Server } from 'socket.io';
import MensajeManager from '../controllers/mensajes.js';

const mm = new MensajeManager();
const configIO = {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
};

export default (httpServer) => {
    const io = new Server(httpServer, configIO);

    io.on('connection', async (socket) => {
        console.log('[Chat] New connection', socket.id);

        socket.on('unirseChat', async (conversacion) => {
            socket.join(conversacion);

            const todos = await mm.obtenerTodosPorConversacion(conversacion);
            socket.emit('todosMensajes', todos);
        });

        socket.on('crearMensaje', async (conversacion, usuario, mensaje) => {
            const nuevo = await mm.crear({
                conversacion,
                usuario,
                mensaje,
            });

            io.to(conversacion).emit('nuevoMensaje', nuevo);
        });

        socket.on('marcarLeido', async (id, usuario) => {
            const mensaje = await mm.marcarLeido(id, usuario);
            io.to(mensaje.conversacion.toString()).emit('leido', id, usuario);
        });

        socket.on('escribiendo', async (conversacion, user) => {
            io.to(conversacion).emit('mostrarEscribiendo', user, 1);
        });

        socket.on('noEscribiendo', async (conversacion, user) => {
            io.to(conversacion).emit('mostrarEscribiendo', user, -1);
        });
    });
};
