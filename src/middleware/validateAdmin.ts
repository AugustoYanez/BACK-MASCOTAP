import { Request as IReq, Response as IRes, NextFunction as INext } from 'express';
import { CustomRequest, Payload } from '../interfaces/jwt';
import { Rol } from '../interfaces/enums';

export const validateAdmin = (req: IReq, res:IRes, next: INext) => {
    if ((req as CustomRequest).payload.rol === Rol.Administrador) {
        next()
    }else {
        return res.sendStatus(401);
    }
}