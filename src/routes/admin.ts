import { Router } from 'express'
import { authenticateToken } from '../middleware/validateToken'
import { validateAdmin } from '../middleware/validateAdmin'
import { agregarCaracteristica, traerCaracteristicas, editarSolicitudMascota } from '../controllers/admin.controllers';
import validate from '../middleware/validateSchema';
import { caracteristicasMascota, } from '../schema/admin.schema';
import { editarSolicitudMascota as solicitud } from '../schema/mascota.schema';

const admin = Router()

admin.use(authenticateToken);
admin.use(validateAdmin);

admin.get('/caracteristicas', traerCaracteristicas)
admin.post('/caracteristicas', validate(caracteristicasMascota), agregarCaracteristica)
admin.put('/editarSolicitudMascota', validate(solicitud), editarSolicitudMascota);

export default admin;