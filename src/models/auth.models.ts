import mongoose from "mongoose";
import { Estado, Documento, Contacto, Rol, tipoDato } from "../interfaces/enums";
import { IUsuario } from "../interfaces/Usuario";
import { ICaracteristicas, IMascota } from "../interfaces/Mascota";


const usuarioSchema = new mongoose.Schema<IUsuario>({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    contrasena: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    },
    nroDocumento: {
        type: String,
        required: true,
        trim: true,
    },
    telefono: {
        type: String,
        required: true,
        trim: true,
    },
    documento: {
        type: String,
        enum: Object.values(Documento),
        required: true,
    },
    contacto: {
        type: String,
        eunm: Object.values(Contacto),
        required: true,
    },
    rol: {
        type: String,
        enum: Object.values(Rol)
    },
    mascotas: [
      { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Mascota' 
      }
    ]
})

export const Usuario = mongoose.model('Usuario', usuarioSchema)

const caracteristicasSchema = new mongoose.Schema<ICaracteristicas>({
  nombre: {
    type: String,
    required: true
  },
  tipoDato: {
    type: String,
    enum: Object.values(tipoDato),
    required: true
  }
})
export const Caracteristica = mongoose.model('Caracteristica', caracteristicasSchema)


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









