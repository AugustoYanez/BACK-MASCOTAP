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

export const getPerfil = async (req: IReq, res: IRes) => {
    try {
        const {id} = req.params;
        const found = await Usuario.findById(id).populate('mascotas').exec();
        if (!found) {
          res.status(200).json(found);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el perfil' });
    }
}
export const editarUsuario = async (req: IReq, res: IRes) => {
    try {
        const { email } = (req as CustomRequest).payload as Payload; // Obtenemos el email del token
        const updates = req.body; // Datos a actualizar

        // Asegúrate de que 'email' no esté en 'updates'
        delete updates.email; // Asegúrate de que no estás intentando actualizar el email

        // Encuentra al usuario, actualiza y guarda los cambios
        const usuario = await Usuario.findOneAndUpdate({ email }, updates, { new: true }).exec();

        if (!usuario) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }

        res.status(200).json({ message: 'Usuario actualizado con éxito', usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

export const eliminarUsuario = async (req: IReq, res: IRes) => {
    try {
        const { email } = (req as CustomRequest).payload as Payload;

        const usuario = await Usuario.findOneAndDelete({ email }).exec();

        if (!usuario) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }

        
        res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};

