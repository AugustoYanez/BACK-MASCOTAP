import { Router } from 'express'
import { authenticateToken } from '../middleware/validateToken'
import validate from '../middleware/validateSchema'
import { agregarMascota, eliminarMascota, traerMascota, traerMascotas, editarMascota } from '../controllers/mascota.controllers'
import { registerMascota } from '../schema/mascota.schema'
import { idSchema } from '../schema/params.schema'


const router = Router();
router.use(authenticateToken)

router.get('/mascotas', traerMascotas)
router.get('/mascotas/:id', validate(idSchema), traerMascota)
router.post('/mascotas', validate(registerMascota), agregarMascota)
router.put('/mascotas', validate(registerMascota), editarMascota)
router.delete('/mascotas/:id', validate(idSchema), eliminarMascota)

export default router;