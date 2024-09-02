import { Router } from 'express'
import { authenticateToken } from '../middleware/validateToken'
import { validateAdmin } from '../middleware/validateAdmin'
import { caracteristicas, traerCaracteristicas } from '../controllers/admin.controllers';

const admin = Router()

admin.use(authenticateToken);
admin.use(validateAdmin);

admin.get('/caracteristicas', traerCaracteristicas)
admin.post('/caracteristicas', caracteristicas)

export default admin;