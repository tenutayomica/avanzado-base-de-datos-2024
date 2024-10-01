import Router from "express";
import AuthController from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();
router.post('/register',AuthController.register);
router.post('/login', AuthController.login);
// ------------- COMPLETAR LAS RUTAS DE LOGIN Y REGISTER -------------


  export default router;