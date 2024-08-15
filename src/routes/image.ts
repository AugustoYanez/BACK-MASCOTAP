import { Router } from 'express'
import { upload } from '../controllers/images.controllers'

const image = Router()

image.post('/upload', upload);

export default image;