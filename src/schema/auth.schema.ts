import { z } from 'zod'
import { Documento, Contacto } from '../interfaces/enums'

export const loginSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: "El campo email, es requerido.",
        }).email({message: "email no valido",}),
        contrasena: z.string({
            required_error:"el campo contraseña, es requerido."
        }).min(8, { message: "Tiene que tener mas de 8 caracteres." }),
    })
})

export const registerSchema = z.object({
    body: z.object({
        nombre: z.string({
            required_error: "El campo nombre, es requerido.",
        }).min(4, {message: "Tiene que tener mas de 4 caracteres."}),

        apellido: z.string({
            required_error: "El campo apellido, es requerido.",
        }).min(4, {message: "Tiene que tener mas de 4 caracteres."}),

        email: z.string({
            required_error: "El campo email, es requerido.",
        }).email({ message: "Ingrese un email valido." }),

        contrasena: z.string().min(8, { message: "Tiene que tener mas de 8 caracteres." }),

        nroDocumento: z.string({
            required_error: "El campo numero de documento, es requerido.",
        }),

        telefono: z.string({
            required_error: "El campo telefono, es requerido.",
        }).min(8, {message: "Tiene que tener mas de 8 caracteres."}),

        documento: z.nativeEnum(Documento, {
            required_error:"El campo documento, es requerido"
        }),

        contacto: z.nativeEnum(Contacto, {
            required_error: "El campo notificacion, es requerido"
        }),
    })
})