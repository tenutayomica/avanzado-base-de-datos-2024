import Router from "express";
import AuthController, { register } from "../controllers/auth.controller.js";

const router = Router();
router.post('/register',AuthController.register);
router.post('/login',AuthController.login);
// ------------- COMPLETAR LAS RUTAS DE LOGIN Y REGISTER -------------

export default router;
