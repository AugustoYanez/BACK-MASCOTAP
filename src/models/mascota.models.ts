import mongoose from "mongoose";
import { Estado, Solicitud} from "../interfaces/enums";
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
      type: String, // Permite cualquier tipo de valor
      required: true
    },
    solicitud: {
      type: String,
      enum: Object.values(Solicitud),
      required:true
    }
  
  })
  
    export const Mascota = mongoose.model('Mascota', mascotaSchema)