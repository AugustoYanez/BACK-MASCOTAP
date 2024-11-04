import { Request as IReq, Response as IRes } from 'express';
import { CustomRequest, Payload } from '../middleware/validateToken';
import { Usuario } from '../models/auth.models';
import { IMascota } from '../interfaces/Mascota';
import { Mascota } from '../models/auth.models';
import mongoose, { ObjectId } from 'mongoose';
import { Estado } from '../interfaces/enums';

export const perfil = async (req: IReq, res: IRes) => {
    try {
        const { email } = (req as CustomRequest).payload as Payload;
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
};

export const traerMascotas = async (req: IReq, res: IRes) => {
    try {
        const { _id } = (req as CustomRequest).payload as Payload;
        const found = await Usuario.findOne({ _id }).populate({
            path: 'mascotas',
            match: {}, // No aplicar filtros aquí, solo trae las mascotas del usuario autenticado
        }).exec();

        if (!found) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }

        res.status(200).json(found.mascotas);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const traerMascota = async (req: IReq, res: IRes) => {
    try {
        const { id } = req.params;
        const { _id } = (req as CustomRequest).payload as Payload;
        
        const usuario = await Usuario.findById(_id).populate({
            path: 'mascotas',
            match: { _id: id },
        }).exec();

        if (!usuario) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }

        const mascota = usuario.mascotas.find(m => m._id.toString() === id);
        
        if (!mascota) {
            res.status(404).json({ error: 'Mascota no encontrada' });
            return;
        }

        res.status(200).json(mascota);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const agregarMascota = async (req: IReq, res: IRes) => {
    try {
        const { placaID, nombre, apodo, estado, ubicacion, edad, descripcion, imagen, caracteristicas }: IMascota = req.body;
        const { _id } = (req as CustomRequest).payload as Payload;
        
        const usuario = await Usuario.findById(_id).populate('mascotas');
        
        if (!usuario) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }

        const mascotasPobladas = await Mascota.find({ _id: { $in: usuario.mascotas } });
        const mascotaExistente = mascotasPobladas.find(mascota => mascota.placaID === placaID);
        
        if (mascotaExistente) {
            res.status(400).json({ error: 'Ya tienes una mascota con ese placaID' });
            return;
        }

        const nuevaMascota = new Mascota({ placaID, nombre, apodo, estado, ubicacion, edad, descripcion, imagen, caracteristicas });
        const mascotaGuardada = await nuevaMascota.save();

        usuario.mascotas.push(new mongoose.Types.ObjectId(mascotaGuardada._id));
        await usuario.save();

        res.status(201).json(mascotaGuardada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar la mascota' });
    }
};

export const editarMascota = async (req: IReq, res: IRes) => {
    try {
        const {_id, placaID, nombre, apodo, estado, edad, descripcion,imagen, caracteristicas, ubicacion}: IMascota = req.body;
        const user = (req as CustomRequest).payload as Payload;  
        const usuario = await Usuario.findById({ _id: user._id }).populate('mascotas');

        const mascota = await Mascota.findOneAndReplace({_id}, {
            placaID,
            nombre,
            apodo,
            estado,
            edad,
            descripcion,
            imagen,
            caracteristicas,
            ubicacion
        });

        if (!usuario) {  
            res.status(404).json({ error: 'Usuario no encontrado' });  
            return;  
        }

        res.status(204).json("ascota editada correctamente");  
        
    } catch (error) {
        console.error(error);  
        res.status(500).json({ error: 'Error al editar la mascota' });  
    }
}

export const eliminarMascota = async (req: IReq, res: IRes) => {
    try {
        const { _id } = (req as CustomRequest).payload as Payload;
        const { id } = req.params;
        
        const usuario = await Usuario.findById(_id).populate('mascotas');
        
        if (!usuario) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }

        const mascotaIndex = usuario.mascotas.findIndex(mascotaId => mascotaId._id.toString() === id);
        
        if (mascotaIndex === -1) {
            res.status(404).json({ error: 'Mascota no encontrada en el perfil del usuario' });
            return;
        }

        await Mascota.findByIdAndDelete(id);
        usuario.mascotas.splice(mascotaIndex, 1);
        await usuario.save();

        res.status(200).json({ message: 'Mascota eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la mascota' });
    }
};

export const traerMascotasPerdidas = async (req: IReq, res: IRes) => {
    try {
        console.log('Buscando mascotas con estado:', Estado.Perdida);
        const mascotasPerdidas = await Mascota.find({ estado: Estado.Perdida }).exec();
        res.status(200).json(mascotasPerdidas);
    } catch (error) {
        console.error('Error al obtener las mascotas perdidas:', error);
        res.status(500).json({ error: 'Error al obtener las mascotas perdidas' });
    }
};
