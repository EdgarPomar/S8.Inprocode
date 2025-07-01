// Usuario.ts (modelo actualizado)
import { Schema, model, Document } from 'mongoose'

export interface IUsuario extends Document {
  nombre: string
  email: string
  password: string
}

const usuarioSchema = new Schema<IUsuario>({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

export const Usuario = model<IUsuario>('Usuario', usuarioSchema)
