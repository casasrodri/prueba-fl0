import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        conversacion: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'conversaciones',
            required: true,
        },
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'usuarios',
            required: true,
        },
        mensaje: { type: String, required: true },
        lecturas: [
            {
                usuario: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'usuarios',
                    required: true,
                },
                fecha: { type: Date, required: true },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model('mensajes', schema);
