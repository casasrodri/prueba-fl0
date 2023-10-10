import { Router } from 'express';
import PublicacionManager from '../controllers/publicaciones.js';

const router = Router();
const pm = new PublicacionManager();

router.get('/', async (req, res) => {
    const publicaciones = await pm.obtenerTodos();
    res.json(publicaciones);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const publicacion = await pm.obtenerPorId(id);
    res.json(publicacion);
});

router.get('/disponibles/:tipo', async (req, res) => {
    const { tipo } = req.params;
    const publicaciones = await pm.obtenerDisponibles(tipo);
    res.json(publicaciones);
});

router.get('/recomendaciones/:id', async (req, res) => {
    const { id } = req.params;
    const publicaciones = await pm.obtenerRecomendaciones(id);
    res.json(publicaciones);
});

router.post('/', async (req, res) => {
    const datos = req.body;
    const creada = await pm.crear(datos);
    res.json(creada);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const datos = req.body;

    const actualizada = await pm.actualizar(id, datos);
    res.json(actualizada);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const eliminada = await pm.eliminar(id);
    res.json(eliminada);
});

export default router;
