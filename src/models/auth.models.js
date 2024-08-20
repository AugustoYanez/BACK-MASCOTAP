"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mascota = exports.Usuario = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const enums_1 = require("../interfaces/enums");
const usuarioSchema = new mongoose_1.default.Schema({
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
        enum: Object.values(enums_1.Documento),
        required: true,
    },
    contacto: {
        type: String,
        eunm: Object.values(enums_1.Contacto),
        required: true,
    },
    rol: {
        type: String,
        enum: Object.values(enums_1.Rol)
    },
    mascotas: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Mascota'
        }
    ]
});
exports.Usuario = mongoose_1.default.model('Usuario', usuarioSchema);
const mascotaSchema = new mongoose_1.default.Schema({
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
        enum: Object.values(enums_1.Estado),
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
});
exports.Mascota = mongoose_1.default.model('Mascota', mascotaSchema);
