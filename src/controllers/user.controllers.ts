import { Request as IReq, Response as IRes } from 'express';
import { Payload, CustomRequest } from '../interfaces/jwt';
import { Usuario } from '../models/auth.models';

export const perfil = async (req: IReq, res: IRes) => {
    try {
        const { email } = (req as CustomRequest).payload as Payload;

        // Encuentra al usuario y puebla las mascotas
        const found = await Usuario.findOne({ email }).populate('mascotas').exec();

        if (!found) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }

        res.status(200).json(found);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el perfil' });
    }
}

