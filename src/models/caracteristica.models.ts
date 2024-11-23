import mongoose from "mongoose";
import { tipoDato } from "../interfaces/enums";
import { ICaracteristicas } from "../interfaces/Caracteristica";


const caracteristicasSchema = new mongoose.Schema<ICaracteristicas>({
  nombre: {
    type: String,
    required: [true, "el nombre es requerido"]
  },
  tipoDato: {
    type: String,
    enum: Object.values(tipoDato),
    required: [true, "el tipo de dato es requerido"]
  }
})

export const Caracteristica = mongoose.model('Caracteristica', caracteristicasSchema)
