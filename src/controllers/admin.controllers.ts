
import { Request as IReq, Response as IRes } from "express";
import { Caracteristica } from "../models/caracteristica.models";
import { ICaracteristicas } from "../interfaces/Caracteristica";
import { Mascota } from "../models/mascota.models";
import { IMascota } from "../interfaces/Mascota";

export const traerCaracteristicas = async (req: IReq, res: IRes) => {
    try {
        const caracteristicas = await Caracteristica.find();
        res.status(200).json(caracteristicas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las caracteristicas' });
    }
}

export const agregarCaracteristica = async (req: IReq, res: IRes) => {
    try {
        const caracteristica : ICaracteristicas = req.body;
        const caracteristicasNueva = new Caracteristica({...caracteristica});
        const saved = caracteristicasNueva.save();
        res.status(201).json(saved);
    } catch (error) {
        console.error(error);  
        res.status(500).json({ error: [error] });  
    }
}

export const editarSolicitudMascota = async (req: IReq, res: IRes) => {
    try {
        const { _id, solicitud }: IMascota = req.body;

        // Validar que se incluyan los datos requeridos
        if (!_id || !solicitud) {
            res.status(400).json({ error: 'El ID de la mascota y la solicitud son obligatorios.' });
            return;
        }

        // Actualizar únicamente el campo "solicitud"
        const mascota = await Mascota.findByIdAndUpdate(
            _id,
            { solicitud },
            { new: true } // Devuelve el documento actualizado
        );

        if (!mascota) {
            res.status(404).json({ error: 'Mascota no encontrada.' });
            return;
        }

        res.status(200).json({ message: 'Solicitud actualizada correctamente.', mascota });
    } catch (error) {
        console.error('Error al actualizar la solicitud:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};
