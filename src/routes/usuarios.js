import { Router } from 'express';
import UsuarioManager from '../controllers/usuarios.js';

const router = Router();
const um = new UsuarioManager();

router.get('/', async (req, res) => {
    const usuarios = await um.obtenerTodos();
    res.json(usuarios);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const usuario = await um.obtenerPorId(id);
    res.json(usuario);
});

router.post('/', async (req, res) => {
    const datos = req.body;
    try {
        const creado = await um.crear(datos);

        req.session.idUsuario = creado._id.toString();
        req.session.nombre = creado.nombre;
        req.session.isLogged = true;
        console.log(req.session);

        res.json(creado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const datos = req.body;

    const actualizado = await um.actualizar(id, datos);
    res.json(actualizado);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const eliminado = await um.eliminar(id);
    res.json(eliminado);
});

export default router;
