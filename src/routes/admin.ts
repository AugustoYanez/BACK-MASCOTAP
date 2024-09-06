import { Router } from 'express'
import { authenticateToken } from '../middleware/validateToken'
import { validateAdmin } from '../middleware/validateAdmin'
import { agregarCaracteristica, traerCaracteristicas } from '../controllers/admin.controllers';

const admin = Router()

admin.use(authenticateToken);
admin.use(validateAdmin);

admin.get('/caracteristicas', traerCaracteristicas)
admin.post('/caracteristicas', agregarCaracteristica)

export default admin;