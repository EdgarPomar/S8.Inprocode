import mongoose, { Schema, Document } from 'mongoose';

export interface IViaje extends Document {
  lugar: string;
  fechaIda: Date;
  fechaVuelta: Date;
  imagen?: string;
  descripcion?: string;
  opinion?: string;
  inscritos: string[]; // 👈 añadimos la lista de usuarios inscritos
}

const ViajeSchema: Schema = new Schema({
  lugar: { type: String, required: true },
  fechaIda: { type: Date, required: true },
  fechaVuelta: { type: Date, required: true },
  imagen: { type: String, required: false },
  descripcion: { type: String, required: false },
  opinion: { type: String, required: false },
  inscritos: [{ type: String, required: false, default: [] }], // 👈 nueva propiedad
});

export default mongoose.model<IViaje>('WorldTrips', ViajeSchema, 'WorldTrips');
