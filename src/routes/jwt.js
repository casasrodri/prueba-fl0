import { Router } from 'express';
import { generarToken } from '../utils/jwt.js';
import jwtAuth from '../middlewares/jwt.js';
import UsuarioManager from '../controllers/usuarios.js';

const router = Router();
const um = new UsuarioManager();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let usuario;

    if (email === 'admin' && password === 'admin') {
        usuario = {
            id: '4dm1n',
            nombre: 'admin',
        };
    }

    if (!usuario) {
        const usuarioExiste = await um.obtenerPorEmail(email);
        if (!usuarioExiste)
            return res.status(401).json({ error: 'Usuario no encontrado' });

        // FIXME Usar bcrypt
        const passwordOk = password === usuarioExiste.password;
        if (!passwordOk)
            return res.status(401).json({ error: 'Contraseña incorrecta' });

        // Se construye el objeto de respuesta
        usuario = {
            id: usuarioExiste._id,
            nombre: usuarioExiste.nombre,
            apellido: usuarioExiste.apellido,
        };
    }

    // Creación del token
    usuario.token = `Bearer ${generarToken(usuario.id)}`;

    // Expiración del token
    const expira = parseJwt(usuario.token).exp;
    usuario.expira = expira * 1000;

    res.json(usuario);
});

router.get('/protected', jwtAuth, (req, res) => {
    res.json({
        mensaje: 'Hola mundo',
        usuario: req.usuario,
    });
});

export default router;

function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
