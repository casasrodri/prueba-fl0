import { Router } from 'express';
import UsuarioManager from '../controllers/usuarios.js';

const router = Router();
const um = new UsuarioManager();

router.get('/', async (req, res) => {
    res.json({
        sessionId: req.session.id,
        isLogged: req.session.isLogged || false,
        session: req.session,
        cookies: req.cookies || {},
        usuario: req.session.idUsuario || null,
        nombre: req.session.nombre || null,
    });
    // res.cookie('prueba', 'Rodri');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (email === 'admin' && password === 'admin') {
        req.session.idUsuario = '-------------------------';
        req.session.nombre = 'admin';
        req.session.isLogged = true;
        return res.json({ admin: true, ok: true });
    }

    const usuario = await um.obtenerPorEmail(email);
    if (!usuario)
        return res.status(401).json({ error: 'Usuario no encontrado' });

    const passwordOk = password === usuario.password;
    if (!usuario)
        return res.status(401).json({ error: 'Contraseña incorrecta' });

    req.session.idUsuario = usuario._id;
    req.session.nombre = usuario.nombre;
    req.session.isLogged = true;

    delete usuario.password;

    res.json({ user: usuario, ok: true });
});

router.post('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: 'Logout error',
                data: { err },
            });
        }
    });

    res.status(200).json({
        status: 'ok',
        message: 'Logout successfull',
        data: {},
    });
});

export default router;
