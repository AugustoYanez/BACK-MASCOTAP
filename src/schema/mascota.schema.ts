import { z } from 'zod'
import { Estado } from '../interfaces/enums'

export const registerMascota = z.object({
    body: z.object({
        placaID: z.string({
            required_error: "el campo placaID, es requerido"
        }),
        nombre: z.string({
            required_error: "el campo nombre, es requerido"
        }),
        apodo: z.string({
            required_error: "el campo apodo, es requerido"
        }),
        estado: z.nativeEnum(Estado, {
            required_error: "el campo estado, es requerido"
        }),
        edad: z.number({
            required_error: "el campo edad, es requerido"
        }),
        descripcion: z.string({
            required_error: "el campo descripcion, es requerido"
        }),
        imagen: z.string({
            required_error: "el campo imagen, es requerido"
        }),
        caracteristicas: z.string({
            required_error: "el campo caracteristicas, es requerido"
        })
    })
})