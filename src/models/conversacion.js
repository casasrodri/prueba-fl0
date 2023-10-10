import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        publicacion: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'publicaciones',
            required: true,
        },
        oferente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'usuarios',
            required: true,
        },
        demandante: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'usuarios',
            required: true,
        },
        finalizado: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model('conversaciones', schema);
