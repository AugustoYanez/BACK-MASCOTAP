import { Router } from 'express'
import { authenticateToken } from '../middleware/validateToken'
import validate from '../middleware/validateSchema'
import { agregarMascota, eliminarMascota, perfil, traerMascota, traerMascotas, editarMascota } from '../controllers/user.controllers'
import { registerMascota } from '../schema/mascota.schema'
import { idSchema } from '../schema/params.schema'

const user = Router()

user.use(authenticateToken);

user.get('/perfil', perfil)
user.get('/mascotas', traerMascotas)
user.get('/mascotas/:id', validate(idSchema), traerMascota)
user.post('/mascotas', validate(registerMascota), agregarMascota)
user.put('/mascotas', validate(registerMascota), editarMascota)
user.delete('/mascotas/:id', validate(idSchema), eliminarMascota)

export default user;