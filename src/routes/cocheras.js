import { Router } from 'express';
import CocheraManager from '../controllers/cocheras.js';
import jwtAuth from '../middlewares/jwt.js';

const router = Router();
router.use(jwtAuth);
const cm = new CocheraManager();

router.get('/', async (req, res) => {
    const cocheras = await cm.obtenerTodos();
    res.json(cocheras);
});

router.get('/delPropietario', async (req, res) => {
    const usuario = req.usuario._id;
    const cocheras = await cm.obtenerPorPropietario(usuario);
    res.json(cocheras);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const cochera = await cm.obtenerPorId(id);
    res.json(cochera);
});

router.get('/propietario/:id', async (req, res) => {
    const { id } = req.params;
    const cocheras = await cm.obtenerPorPropietario(id);
    res.json(cocheras);
});

router.post('/', async (req, res) => {
    const datos = req.body;
    const creada = await cm.crear(datos);
    res.json(creada);
});

router.put('/:id', async (req, res) => {
    console.log('Se llamó a este endpoint');
    const { id } = req.params;
    const datos = req.body;

    const actualizada = await cm.actualizar(id, datos);
    res.json(actualizada);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const eliminada = await cm.eliminar(id);
    res.json(eliminada);
});

export default router;
