import mongoose from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

const schema = new mongoose.Schema(
    {
        patente: { type: String, required: true },
        marca: { type: String, required: true },
        modelo: { type: String, required: true },
        color: { type: String, required: true },
        tipo: { type: String, required: true },
        propietario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'usuarios',
            required: true,
        },
        alias: { type: String, required: true },
    },
    { timestamps: true }
);

// schema.plugin(mongoosePaginate);

export default mongoose.model('vehiculos', schema);
