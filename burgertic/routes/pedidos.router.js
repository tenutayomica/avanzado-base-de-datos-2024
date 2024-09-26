import Router from "express";
import PedidosController from "../controllers/pedidos.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// ------------- COMPLETAR LAS RUTAS DE PEDIDOS -------------
// IMPORTANTE: La ruta /usuario debe ir antes que la ruta /:id
// Si no, Express interpretará "usuario" como un id y no funcionará correctamente

// Recordar utilizar los middleware verifyToken y/o verifyAdmin en las rutas que correspondan
router.get('/usuario/:id', PedidosController.getPedidosByUser)
router.get('/', PedidosController.getPedidos)
router.get('/')

export default router;
