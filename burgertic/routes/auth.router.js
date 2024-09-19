import Router from "express";
import AuthController, { register } from "../controllers/auth.controller.js";

const router = Router();
router.post('/',AuthController.register);
router.post('/',AuthController.login);
// ------------- COMPLETAR LAS RUTAS DE LOGIN Y REGISTER -------------

export default router;
