import { Router } from 'express'
import { authenticateToken } from '../middleware/validateToken'
import validate from '../middleware/validateSchema'
import { agregarMascota, eliminarMascota, traerMascota, traerMascotasUsuaruio, editarMascota, traerMascotasPerdidas, traerMascotas, traerMascotasPagina, encontrarDueño } from '../controllers/mascota.controllers'
import { registerMascota } from '../schema/mascota.schema'
import { idSchema } from '../schema/params.schema'


const router = Router();
router.use(authenticateToken)

router.get('/mascotas/pag', traerMascotasPagina);
router.get('/mascotas', traerMascotas)
router.get('/mascotasUsuario', traerMascotasUsuaruio)
router.get('/mascotas/:id', validate(idSchema), traerMascota)
router.post('/mascotas', validate(registerMascota), agregarMascota)
router.put('/mascotas', validate(registerMascota), editarMascota)
router.delete('/mascotas/:id', validate(idSchema), eliminarMascota)
router.get('/mascotas-perdidas', traerMascotasPerdidas);
router.get('/encontrar-dueno/:id', validate(idSchema), encontrarDueño)

export default router;