import Router from "express";
import AuthController, { register } from "../controllers/auth.controller.js";

const router = Router();
router.post('/register',AuthController.register);
router.post('/login',AuthController.login);
// ------------- COMPLETAR LAS RUTAS DE LOGIN Y REGISTER -------------


class AuthController {
    static register(req, res) {
      // lógica para registrar un usuario
      res.send("Registrado");
    }
  
    static login(req, res) {
      // lógica para loguear un usuario
      res.send("Logueado");
    }
  }
  
  export default router;