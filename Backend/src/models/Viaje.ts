import mongoose, { Schema, Document } from 'mongoose';

export interface IViaje extends Document {
  lugar: string;
  fechaIda: Date;
  fechaVuelta: Date;
  imagen?: string;
  descripcion?: string;
  opinion?: string;
}

const ViajeSchema: Schema = new Schema({
  lugar: { type: String, required: true },
  fechaIda: { type: Date, required: true },
  fechaVuelta: { type: Date, required: true },
  imagen: { type: String, required: true } ,
  descripcion: { type: String, required: true },
  opinion: { type: String, required: true },
});

export default mongoose.model<IViaje>('WorldTrips', ViajeSchema, 'WorldTrips');
