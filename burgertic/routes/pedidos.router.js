import Router from "express";
import PedidosController from "../controllers/pedidos.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// ------------- COMPLETAR LAS RUTAS DE PEDIDOS -------------
// IMPORTANTE: La ruta /usuario debe ir antes que la ruta /:id
// Si no, Express interpretará "usuario" como un id y no funcionará correctamente

// Recordar utilizar los middleware verifyToken y/o verifyAdmin en las rutas que correspondan
router.get('/pedidos/usuario', verifyToken, PedidosController.getPedidosByUser)
router.get('/', verifyAdmin, PedidosController.getPedidos)
router.put('/pedidos/:id/aceptar', verifyAdmin, PedidosController.aceptarPedido)
router.put('/pedidos/:id/comenzar', verifyAdmin, PedidosController.comenzarPedido)
router.post('/',verifyToken, PedidosController.createPedido)
router.put('/pedidos/:id', verifyToken, PedidosController.deletePedido)
router.get('/pedidos/:id', verifyAdmin, PedidosController.getPedidoById)
router.put('/pedidos/:id/entregar', verifyAdmin, PedidosController.entregarPedido)

export default router;
