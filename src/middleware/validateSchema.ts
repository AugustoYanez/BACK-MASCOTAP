import { Request as IReq, Response as IRes, NextFunction } from 'express';
import { Schema, z } from 'zod';

// Middleware de validación
const validate = (schema: Schema) => (req: IReq, res: IRes, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Obtener solo los mensajes de error
      const errorMessages = err.issues.map(issue => issue.message);
      return res.status(400).json(errorMessages);
    }
  }
};

export default validate;
