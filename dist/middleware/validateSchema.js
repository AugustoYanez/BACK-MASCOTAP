"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Middleware de validación
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            // Obtener solo los mensajes de error
            const errorMessages = err.issues.map(issue => issue.message);
            return res.status(400).json(errorMessages);
        }
    }
};
exports.default = validate;
