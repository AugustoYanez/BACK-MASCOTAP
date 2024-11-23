import { Request as IReq, Response as IRes, NextFunction as INext } from 'express';

export interface Payload {
    _id: string;
    nombre: string;
    email: string;
    rol: string;
  // Otras propiedades que puedan estar en el payload
}
export interface CustomRequest extends IReq {
    payload: Payload;
   }