import { Request as IReq, Response as IRes } from 'express';
import { Payload, CustomRequest } from '../interfaces/jwt';
import { Usuario } from '../models/auth.models';
import { IMascota } from '../interfaces/Mascota';
import { Mascota } from '../models/mascota.models';
import mongoose from 'mongoose';
import { Estado, Solicitud } from '../interfaces/enums';

export const traerMascotasUsuaruio = async (req: IReq, res: IRes) => {
    try {
        const {_id} = (req as CustomRequest).payload as Payload;
        const found = await Usuario.findOne({ _id }).populate('mascotas').exec();
        if (!found) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        res.status(200).json(found.mascotas);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const traerMascotas = async (req: IReq, res: IRes) => {
    try {
        const found = await Mascota.find();
        if (!found) {
            res.status(404).json({ error: 'Mascotas no encontrado' });
            return;
        }
        res.status(200).json(found);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const traerMascota = async (req: IReq, res: IRes) => {
    try {
        const {id} = req.params;
        console.log(id);
        const found = await Mascota.findOne({ _id:id });
        if (!found) {
            res.status(404).json({ error: 'Mascota no encontrado' });
            return;
        }
        res.status(200).json(found);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const agregarMascota = async (req: IReq, res: IRes) => {  
    try {  
        const { placaID, nombre, apodo, estado, edad, descripcion,imagen, caracteristicas }: IMascota = req.body;
        const { _id } = (req as CustomRequest).payload as Payload;  
        const usuario = await Usuario.findById({ _id }).populate('mascotas');

        if (!usuario) {  
            res.status(404).json({ error: 'Usuario no encontrado' });  
            return;  
        }  

        // Comprobar si la mascota ya existe
        const mascotasPobladas = await Mascota.find({ _id: { $in: usuario.mascotas } });

        const mascotaExistente = mascotasPobladas.find(mascota =>   
            mascota.placaID === placaID
        );  

        if (mascotaExistente) {  
            res.status(400).json({ error: 'Ya tienes una mascota con ese placaID' });  
            return;  
        }  

        // Crear una nueva instancia de la mascota  
        const nuevaMascota = new Mascota({  
            placaID,  
            nombre,  
            apodo,  
            estado,  
            edad,  
            descripcion,  
            imagen,  
            caracteristicas,
            solicitud: Solicitud.espera
        });  

        // Guardar la nueva mascota en la base de datos
        const mascotaGuardada = await nuevaMascota.save();

        // Agregar la mascota guardada al usuario  
        usuario.mascotas.push(new mongoose.Types.ObjectId(mascotaGuardada._id));  
        await usuario.save();  

        res.status(201).json(mascotaGuardada);  
    } catch (error) {  
        console.error(error);  
        res.status(500).json({ error: 'Error al agregar la mascota' });  
    }  
}

export const editarMascota = async (req: IReq, res: IRes) => {
    try {
        const {_id, placaID, nombre, apodo, estado, edad, descripcion,imagen, caracteristicas, solicitud }: IMascota = req.body;
        const user = (req as CustomRequest).payload as Payload;  
        const usuario = await Usuario.findById({ _id: user._id }).populate('mascotas');

        /* const solicitud = await Mascota.find({_id}, 'solicitud')
        console.log(solicitud);
         */
        const mascota = await Mascota.findOneAndReplace({_id}, {
            placaID,
            nombre,
            apodo,
            estado,
            edad,
            descripcion,
            imagen,
            caracteristicas,
            solicitud
        });

        if (!usuario) {  
            res.status(404).json({ error: 'Usuario no encontrado' });  
            return;  
        }

        res.status(204).json("mascota editada correctamente");  
        
    } catch (error) {
        console.error(error);  
        res.status(500).json({ error: 'Error al editar la mascota' });  
    }
}

export const eliminarMascota = async (req: IReq, res: IRes) => {
    try {
        const { _id } = (req as CustomRequest).payload as Payload;
        const { id } = req.params;

        // Buscar al usuario
        const usuario = await Usuario.findById({_id}).populate('mascotas');
        if (!usuario) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }

        // Verificar que la mascota pertenece al usuario
        const mascotaIndex = usuario.mascotas.findIndex(mascotaId => mascotaId._id.toString() === id);
        if (mascotaIndex === -1) {
            res.status(404).json({ error: 'Mascota no encontrada en el perfil del usuario' });
            return;
        }

        // Eliminar la mascota de la colección Mascota
        await Mascota.findByIdAndDelete(id);

        // Eliminar la referencia de la mascota del usuario
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

export const encontrarDueño = async (req: IReq, res: IRes) => {
    const {  } : IMascota = req.body;


}