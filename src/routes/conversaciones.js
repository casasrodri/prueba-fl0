import { Router } from 'express';
import Conversacion from '../models/conversacion.js';
import MensajeManager from '../controllers/mensajes.js';

const router = Router();
const mm = new MensajeManager();

router.post('/', async (req, res) => {
    const datos = req.body;
    const creada = await Conversacion.create(datos);
    res.json(creada);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const conversacion = await Conversacion.findById(id).populate(
        'publicacion oferente demandante'
    );
    res.json(conversacion);
});

router.get('/porPublicacion/:id', async (req, res) => {
    const id = req.params.id;
    const conversaciones = await Conversacion.find({
        publicacion: id,
    }).populate('publicacion oferente demandante');
    res.json(conversaciones);
});

router.get('/:cid/mensajesNoLeidos/usuario/:uid', async (req, res) => {
    const { cid, uid } = req.params;

    const mensajesConversacion = await mm.obtenerTodosPorConversacion(cid);

    const mensajesNoLeidos = mensajesConversacion.filter((m) => {
        const leido = m.lecturas.find(
            (l) => l.usuario.toString() == uid.toString()
        );
        return !leido;
    });

    res.json(mensajesNoLeidos);
});

router.get('/delUsuario/:id', async (req, res) => {
    const id = req.params.id;
    const conversaciones = await Conversacion.find({
        $or: [{ oferente: id }, { demandante: id }],
    }).populate('publicacion oferente demandante');
    // TODO filtrar las conversaciones cuyas publicaciones estén finalizadas
    res.json(conversaciones);
});

export default router;
