import { Router } from 'express'
import { authenticateToken } from '../middleware/validateToken'
import validate from '../middleware/validateSchema'
import { agregarMascota, eliminarMascota, perfil, traerMascota, traerMascotas, editarMascota } from '../controllers/user.controllers'
import { registerMascota } from '../schema/mascota.schema'
import { idSchema } from '../schema/params.schema'

const user = Router()

user.get('/perfil', authenticateToken, perfil)
user.get('/mascotas', authenticateToken, traerMascotas)
user.get('/mascotas/:id', authenticateToken, validate(idSchema), traerMascota)
user.post('/mascotas', authenticateToken, validate(registerMascota), agregarMascota)
user.put('/mascotas', authenticateToken, validate(registerMascota), editarMascota)
user.delete('/mascotas/:id', authenticateToken, validate(idSchema), eliminarMascota)

export default user;