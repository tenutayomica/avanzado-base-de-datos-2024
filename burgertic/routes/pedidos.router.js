import Router from "express";
import PedidosController from "../controllers/pedidos.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// ------------- COMPLETAR LAS RUTAS DE PEDIDOS -------------
// IMPORTANTE: La ruta /usuario debe ir antes que la ruta /:id
// Si no, Express interpretará "usuario" como un id y no funcionará correctamente

// Recordar utilizar los middleware verifyToken y/o verifyAdmin en las rutas que correspondan
router.get('/usuario', verifyToken, PedidosController.getPedidosByUser)//listo
router.get('/', verifyToken, verifyAdmin, PedidosController.getPedidos)//listo
router.put('/:id/aceptar', verifyToken, verifyAdmin, PedidosController.aceptarPedido)
router.put('/:id/comenzar', verifyToken, verifyAdmin, PedidosController.comenzarPedido)
router.post('/',verifyToken, PedidosController.createPedido) //listo
router.delete('/:id', verifyToken, verifyAdmin, PedidosController.deletePedido)
router.get('/:id', verifyToken, verifyAdmin, PedidosController.getPedidoById)//listo
router.put('/:id/entregar', verifyToken, verifyAdmin, PedidosController.entregarPedido)

export default router;
