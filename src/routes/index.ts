import { Router } from "express";
import auth from "./auth";
import user from "./user";
import image from "./image";
const router = Router();

router.use('/api',auth);
router.use('/user', user);
router.use('/image', image)
export default router;