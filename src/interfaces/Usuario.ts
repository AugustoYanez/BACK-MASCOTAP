import { Documento, Contacto, Rol } from "./enums"
import mongoose from 'mongoose';
export interface IUsuario {
    nombre: string;
    apellido: string
    email: string;
    contrasena: string;
    nroDocumento: string;
    telefono: string;
    documento: Documento;
    contacto: Contacto;
    rol: Rol; 
    mascotas: mongoose.Types.ObjectId[];
}