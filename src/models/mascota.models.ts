import mongoose from "mongoose";
import { Estado} from "../interfaces/enums";
import {  IMascota } from "../interfaces/Mascota";


const mascotaSchema = new mongoose.Schema<IMascota>({

    placaID: {
      type: String,
      required: true
    },
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    apodo: {
      type: String,
      trim: true
    },
    estado: {
      type: String,
      enum: Object.values(Estado),
      required: true,
  },
    edad: {
      type: Number,
      required: true
    },
    descripcion: {
      type: String,
      required: true,
      trim: true
    },
    imagen: {
      type: String,
      required: true
    },
    caracteristicas: {
      type: mongoose.Schema.Types.Mixed, // Permite cualquier tipo de valor
      required: true
    }
  
  })
  
    export const Mascota = mongoose.model('Mascota', mascotaSchema)