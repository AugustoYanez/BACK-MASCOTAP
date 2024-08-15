import mongoose from "mongoose";
import { Estado, Documento, Contacto, Rol } from "../interfaces/enums";
import { IUsuario } from "../interfaces/Usuario";
import { IMascota } from "../interfaces/Mascota";


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
    type: String,
    required: true,
    trim: true
  },

})

  export const Mascota = mongoose.model('Mascota', mascotaSchema)









