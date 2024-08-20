"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMascota = void 0;
const zod_1 = require("zod");
const enums_1 = require("../interfaces/enums");
exports.registerMascota = zod_1.z.object({
    body: zod_1.z.object({
        placaID: zod_1.z.string({
            required_error: "el campo placaID, es requerido"
        }),
        nombre: zod_1.z.string({
            required_error: "el campo nombre, es requerido"
        }),
        apodo: zod_1.z.string({
            required_error: "el campo apodo, es requerido"
        }),
        estado: zod_1.z.nativeEnum(enums_1.Estado, {
            required_error: "el campo estado, es requerido"
        }),
        edad: zod_1.z.number({
            required_error: "el campo edad, es requerido"
        }),
        descripcion: zod_1.z.string({
            required_error: "el campo descripcion, es requerido"
        }),
        imagen: zod_1.z.string({
            required_error: "el campo imagen, es requerido"
        }),
        caracteristicas: zod_1.z.string({
            required_error: "el campo caracteristicas, es requerido"
        })
    })
});
