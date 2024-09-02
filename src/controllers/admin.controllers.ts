
import { Request as IReq, Response as IRes } from "express";
import { Caracteristica } from "../models/auth.models";
import { ICaracteristicas } from "../interfaces/Mascota";

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
        res.status(500).json({ error: 'Error al agregar la caracteristicas' });  
    }
}