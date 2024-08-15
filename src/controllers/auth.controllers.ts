import bcrypt from "bcrypt";
import { IUsuario } from "../interfaces/Usuario";
import { Usuario } from "../models/auth.models";
import { Request as IReq, Response as IRes } from "express";
import { createAccesToken } from "../libs/jwt";

export const login = async (req: IReq, res: IRes) => {
  try {
    const { email, contrasena }: IUsuario = req.body;

    const found = await Usuario.findOne({ email });
    if (!found) return res.status(400).json(["No se encontro al usuario. "]);

    const match = await bcrypt.compare(contrasena, found.contrasena);
    if (!match) return res.status(500).json(["Contraseña incorrecta. "]);

    const token = await createAccesToken({
      _id: found._id,
      nombre: found.nombre,
      email: found.email,
    });

    res.json({ message: "Sesion iniciada correctamente.", token });
  } catch (error) {
    res.status(500).json({ mensajes: 'Error al iniciar sesion', error: [error]});
  }
};

export const register = async (req: IReq, res: IRes) => {
  try {
    const {
        nombre,
        apellido,
        documento,
        contacto,
        nroDocumento,
        telefono,
        email,
        contrasena,
      }: IUsuario = req.body;
    
      const found = await Usuario.findOne({ email });
    
      if (found) return res.status(400).json(["El e-mail ya esta en uso."]);
    
      const hash = await bcrypt.hash(contrasena, 10);
    
      const log = await new Usuario({
        nombre,
        apellido,
        documento,
        contacto,
        nroDocumento,
        telefono,
        email,
        contrasena: hash,
      }).save();
    
      const token = await createAccesToken({ _id: log._id, email: log.email });
    
      res.status(201).json({ message: "Registro correcto. ", token });
  } catch (error) {
    res.status(500).json({ mensajes: 'Error al registrarse', error: [error]});
  }
};
