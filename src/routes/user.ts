import { Router } from 'express'
import { authenticateToken } from '../middleware/validateToken'
import validate from '../middleware/validateSchema'
import { perfil,getPerfil, editarUsuario, eliminarUsuario} from '../controllers/user.controllers'
import { registerMascota } from '../schema/mascota.schema'
import { idSchema } from '../schema/params.schema'

const user = Router()

user.use(authenticateToken);

user.get('/perfil', perfil)
user.get( '/perfil/:id', validate(idSchema), getPerfil)
user.put('/editar',  editarUsuario); // Ruta para editar usuario
user.delete('/eliminar', eliminarUsuario); 

export default user;