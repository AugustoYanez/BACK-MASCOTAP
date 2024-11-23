import { z } from 'zod'
import { Estado, tipoDato } from '../interfaces/enums'

export const caracteristicasMascota = z.object({
    body: z.object({
        nombre: z.string({
            required_error:"el campo nombre es requerido",
        }),
        tipoDato: z.nativeEnum(tipoDato,{
            required_error: "el campo tipo de dato es requerido"
        })
    })
})