import { Router } from 'express'
import { upload } from '../controllers/images.controllers'
import { authenticateToken } from '../middleware/validateToken';

const image = Router()

image.use(authenticateToken);

image.post('/upload', upload);

export default image;