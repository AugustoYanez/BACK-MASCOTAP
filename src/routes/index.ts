import { Router } from "express";
import auth from "./auth";
import user from "./user";
import image from "./image";
import admin from "./admin";
import mascota from "./mascota";
const router = Router();

router.use('/api',auth);
router.use('/user', user);
router.use('/image', image)
router.use('/admin', admin)
router.use("/mascota", mascota)
export default router;