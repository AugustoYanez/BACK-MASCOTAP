import { Router } from 'express';
import { authenticateToken } from '../middleware/validateToken';
import {
    agregarMascota,
    eliminarMascota,
    perfil,
    traerMascota,
    traerMascotas,
    editarMascota,
    traerMascotasPerdidas
} from '../controllers/user.controllers';

const user = Router();

user.get('/perfil', authenticateToken, perfil);
user.get('/mascotas', authenticateToken, traerMascotas);
user.get('/mascotas/:id', authenticateToken, traerMascota);
user.post('/mascotas', authenticateToken, agregarMascota);
user.put('/mascotas', authenticateToken, editarMascota);
user.delete('/mascotas/:id', authenticateToken, eliminarMascota);
user.get('/mascotas-perdidas', authenticateToken, traerMascotasPerdidas);

export default user;
