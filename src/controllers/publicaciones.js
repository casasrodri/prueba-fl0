import Publicacion from '../models/publicacion.js';
import { validarFaltantes } from '../utils/validaciones.js';

const determinarSimilitud = (base, comparada) => {
    const iniCompartido = base.ini < comparada.ini ? comparada.ini : base.ini;
    const finCompartido = base.fin < comparada.fin ? base.fin : comparada.fin;

    // Datos en segundos
    const duracion1 = (base.fin - base.ini) / 1000;
    const duracion2 = (comparada.fin - comparada.ini) / 1000;
    const duracionCompartida = (finCompartido - iniCompartido) / 1000;

    if (duracionCompartida <= 0) {
        return 0;
    }

    return duracionCompartida / duracion1;
};

export default class PublicacionManager {
    async crear(publicacion) {
        const { tipo, creador, ini, fin, cochera, vehiculo } = publicacion;

        validarFaltantes('Faltan datos para crear la publicación.', {
            tipo,
            creador,
            ini,
            fin,
        });

        if (tipo === 'demanda') {
            validarFaltantes('Faltan datos de la demanda.', { vehiculo });
        }

        if (tipo === 'oferta') {
            validarFaltantes('Faltan datos de la oferta.', { cochera });
        }

        const creado = await Publicacion.create(publicacion);
        return creado;
    }

    async obtenerTodos() {
        const publicaciones = await Publicacion.find()
            .populate('creador cochera vehiculo')
            .sort({
                createdAt: -1,
            });
        return publicaciones;
    }

    async obtenerDisponibles(tipo) {
        const publicaciones = await Publicacion.find({
            estado: 'disponible',
            tipo,
        })
            .populate('creador cochera vehiculo')
            .sort({
                createdAt: -1,
            });
        return publicaciones;
    }

    async obtenerRecomendaciones(id) {
        const publicacion = await this.obtenerPorId(id);
        const tipo = publicacion.tipo === 'oferta' ? 'demanda' : 'oferta';

        // Obtención de publicaciones disponibles del tipo contrario
        const publicaciones = await this.obtenerDisponibles(tipo);

        // Cálculo de similitud
        const publicacionObj = publicaciones.map((publ) => {
            const p = publ.toObject();
            p.similitud = determinarSimilitud(publicacion, p);
            return p;
        });

        // Filtrado de similitud y que no sean del mismo usuario
        const publicacionesSimilares = publicacionObj.filter((p) => {
            return p.similitud > 0;
        });

        // Ordenamiento por similitud (descendente)
        publicacionesSimilares.sort((a, b) => {
            return b.similitud - a.similitud;
        });

        return publicacionesSimilares;
    }

    async obtenerPorId(id) {
        const publicacion = await Publicacion.findById(id).populate(
            'creador cochera vehiculo'
        );
        return publicacion;
    }

    async actualizar(id, publicacion) {
        const actualizada = await Publicacion.findByIdAndUpdate(
            id,
            publicacion,
            {
                new: true,
            }
        );
        return actualizada;
    }

    async eliminar(id) {
        const eliminada = await Publicacion.findByIdAndDelete(id);
        return eliminada;
    }
}
