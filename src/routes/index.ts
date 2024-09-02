import { Router } from "express";
import auth from "./auth";
import user from "./user";
import image from "./image";
import admin from "./admin";
const router = Router();

router.use('/api',auth);
router.use('/user', user);
router.use('/image', image)
router.use('/admin', admin)
export default router;