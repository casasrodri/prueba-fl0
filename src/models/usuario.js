import mongoose from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

const schema = new mongoose.Schema(
    {
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true }, // FIXME: encriptar
        telefono: { type: Number, required: false },
        cbu: { type: String },
    },
    { timestamps: true }
);

// schema.plugin(mongoosePaginate);

export default mongoose.model('usuarios', schema);
