import Usuario from '../models/usuario.js';
import { validarFaltantes } from '../utils/validaciones.js';

export default class UsuarioManager {
    async crear(usuario) {
        const { nombre, apellido, email, password } = usuario;

        validarFaltantes('Faltan datos para crear al usuario.', {
            nombre,
            apellido,
            email,
            password,
        });

        const creado = await Usuario.create(usuario);
        return creado;
    }

    async obtenerTodos() {
        const usuarios = await Usuario.find();
        return usuarios;
    }

    async obtenerPorId(id) {
        const usuario = await Usuario.findById(id);
        return usuario;
    }

    async obtenerPorEmail(email) {
        const usuario = await Usuario.findOne({ email });
        return usuario;
    }

    async actualizar(id, usuario) {
        const actualizado = await Usuario.findByIdAndUpdate(id, usuario, {
            new: true,
        });
        return actualizado;
    }

    async eliminar(id) {
        const eliminado = await Usuario.findByIdAndDelete(id);
        return eliminado;
    }
}
