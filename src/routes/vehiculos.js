import { Router } from 'express';
import VehiculoManager from '../controllers/vehiculos.js';
import jwtAuth from '../middlewares/jwt.js';

const router = Router();
router.use(jwtAuth);
const vm = new VehiculoManager();

router.get('/', async (req, res) => {
    const vehiculos = await vm.obtenerTodos();
    res.json(vehiculos);
});

router.get('/delPropietario', async (req, res) => {
    const usuario = req.usuario._id;
    const vehiculos = await vm.obtenerPorPropietario(usuario);
    res.json(vehiculos);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const vehiculo = await vm.obtenerPorId(id);
    res.json(vehiculo);
});

router.get('/propietario/:id', async (req, res) => {
    const { id } = req.params;
    const vehiculos = await vm.obtenerPorPropietario(id);
    res.json(vehiculos);
});

router.post('/', async (req, res) => {
    const datos = req.body;
    const creado = await vm.crear(datos);
    res.json(creado);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const datos = req.body;

    const actualizado = await vm.actualizar(id, datos);
    res.json(actualizado);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const eliminado = await vm.eliminar(id);
    res.json(eliminado);
});

export default router;
