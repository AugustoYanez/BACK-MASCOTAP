
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { Request as IReq, Response as IRes } from 'express';
import { IUsuario } from '../interfaces/Usuario';
import { Usuario } from '../models/auth.models';
import { createAccesToken } from '../libs/jwt';
import weakPasswords from '../data/weakPasswords.json'

import { Rol } from "../interfaces/enums";
const INTENTOS_FALLIDOS_MAX = 10; // Cambiado a 10 intentos
const TIEMPO_BLOCK = 5 * 60 * 1000; // 5 minutos

// Convertir el JSON importado en un Set para búsqueda rápida
const weakPasswordsSet = new Set<string>(weakPasswords);

export const login = async (req: IReq, res: IRes) => {
  try {
    const { email, contrasena }: IUsuario = req.body;

    const found = await Usuario.findOne({ email });
    if (!found) return res.status(400).json(["No se encontró al usuario."]);

    const ahora = Date.now();

    // Verificar si está bloqueado
    if (found.bloqueadoHasta && found.bloqueadoHasta > ahora) {
      const tiempoRestante = Math.max(0, Math.ceil((found.bloqueadoHasta - ahora) / 1000)); // Tiempo restante en segundos
      return res.status(403).json([`Cuenta bloqueada. Intente de nuevo después de ${new Date(found.bloqueadoHasta).toLocaleTimeString()}`, 0]);
    }

    // Verificar la contraseña
    const match = await bcrypt.compare(contrasena, found.contrasena);
    if (!match) {
      found.intentosFallidos = found.intentosFallidos || 0; // Inicializar si es undefined
      found.intentosFallidos += 1;

      const intentosRestantes = INTENTOS_FALLIDOS_MAX - found.intentosFallidos;

      if (found.intentosFallidos >= INTENTOS_FALLIDOS_MAX) {
        found.bloqueadoHasta = ahora + TIEMPO_BLOCK;
        found.intentosFallidos = 0; // Opcional: Resetear intentos fallidos al bloquear
        await found.save();
        return res.status(403).json([`Cuenta bloqueada temporalmente por intentos fallidos.`, 0]);
      }

      await found.save();
      return res.status(400).json([`Contraseña incorrecta.`, intentosRestantes]);
    }

    // Si la contraseña es correcta, reiniciar los intentos fallidos
    found.intentosFallidos = 0;
    found.bloqueadoHasta = undefined;
    await found.save();

    const token = await createAccesToken({
      _id: found._id,
      nombre: found.nombre,
      email: found.email,
      rol: found.rol
    });

    res.json({ message: "Sesión iniciada correctamente.", token });
  } catch (error) {
    res.status(500).json({ mensajes: 'Error al iniciar sesión', error: [error] });
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

    // Verificar si la contraseña está en la lista de contraseñas débiles
    if (weakPasswordsSet.has(contrasena)) {
      return res.status(400).json(["La contraseña es demasiado débil."]);
    }

    const found = await Usuario.findOne({ email });
    if (found) return res.status(400).json(["El e-mail ya está en uso."]);

    const hash = await bcrypt.hash(contrasena, 10);

    const log = await new Usuario({
      nombre,
      apellido,
      documento,
      contacto,
      nroDocumento,
      telefono,
      email,
      rol: Rol.Usuario,
      contrasena: hash,
    }).save();

    const token = await createAccesToken({ _id: log._id, email: log.email });

    res.status(201).json({ message: "Registro correcto.", token });
  } catch (error) {
    res.status(500).json({ mensajes: 'Error al registrarse', error: [error] });
  }
};
