"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
const enums_1 = require("../interfaces/enums");
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "El campo email, es requerido.",
        }).email({ message: "email no valido", }),
        contrasena: zod_1.z.string({
            required_error: "el campo contraseña, es requerido."
        }).min(8, { message: "Tiene que tener mas de 8 caracteres." }),
    })
});
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        nombre: zod_1.z.string({
            required_error: "El campo nombre, es requerido.",
        }).min(4, { message: "Tiene que tener mas de 4 caracteres." }),
        apellido: zod_1.z.string({
            required_error: "El campo apellido, es requerido.",
        }).min(4, { message: "Tiene que tener mas de 4 caracteres." }),
        email: zod_1.z.string({
            required_error: "El campo email, es requerido.",
        }).email({ message: "Ingrese un email valido." }),
        contrasena: zod_1.z.string().min(8, { message: "Tiene que tener mas de 8 caracteres." }),
        nroDocumento: zod_1.z.string({
            required_error: "El campo numero de documento, es requerido.",
        }),
        telefono: zod_1.z.string({
            required_error: "El campo telefono, es requerido.",
        }).min(8, { message: "Tiene que tener mas de 8 caracteres." }),
        documento: zod_1.z.nativeEnum(enums_1.Documento, {
            required_error: "El campo documento, es requerido"
        }),
        contacto: zod_1.z.nativeEnum(enums_1.Contacto, {
            required_error: "El campo notificacion, es requerido"
        }),
    })
});
