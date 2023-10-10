import Vehiculo from '../models/vehiculo.js';
import { validarFaltantes } from '../utils/validaciones.js';

export default class VehiculoManager {
    async crear(vehiculo) {
        const { patente, marca, modelo, color, tipo, propietario, alias } =
            vehiculo;

        validarFaltantes('Faltan datos para crear el vehículo.', {
            patente,
            marca,
            modelo,
            color,
            tipo,
            propietario,
            alias,
        });

        const creado = await Vehiculo.create(vehiculo);
        return creado;
    }

    async obtenerTodos() {
        const vehiculos = await Vehiculo.find();
        return vehiculos;
    }

    async obtenerPorId(id) {
        const vehiculo = await Vehiculo.findById(id).populate('propietario');
        return vehiculo;
    }

    async obtenerPorPropietario(id) {
        const vehiculos = await Vehiculo.find({ propietario: id });
        return vehiculos;
    }

    async actualizar(id, vehiculo) {
        const actualizado = await Vehiculo.findByIdAndUpdate(id, vehiculo, {
            new: true,
        });
        return actualizado;
    }

    async eliminar(id) {
        const eliminado = await Vehiculo.findByIdAndDelete(id);
        return eliminado;
    }
}
