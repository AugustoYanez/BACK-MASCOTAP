import mongoose from "mongoose";
import { Documento, Contacto, Rol,  } from "../interfaces/enums";
import { IUsuario } from "../interfaces/Usuario";

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
