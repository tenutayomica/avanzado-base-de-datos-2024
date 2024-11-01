import pedidosService from "../services/pedidos.service.js";
import PedidosService from "../services/pedidos.service.js";
const getPedidos = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener todos los pedidos
            2. Devolver un json con los pedidos (status 200)
            3. Devolver un mensaje de error si algo falló (status 500)
        
    */
   try{
    const agarrarPedidos= await pedidosService.getPedidos();
    res.status(200).json(agarrarPedidos);

   }
   catch(error){
    console.error(error);
    res.status(500).json({error:'ha fallado'});
   }
};

const getPedidosByUser = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener los pedidos del usuario
            2. Si el usuario no tiene pedidos, devolver una lista vacía (status 200)
            3. Si el usuario tiene pedidos, devolver un json con los pedidos (status 200)
            4. Devolver un mensaje de error si algo falló (status 500)
        
    */
   try{
     const userId= req.id;
     const pedir= await pedidosService.getPedidosByUser(userId);
     res.status(200).json(pedidos);
    
      }
   catch(error){
    console.error(error);
    res.status(500).json({error: 'ha fallado'});
   }
};

const getPedidoById = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, devolver un json con el pedido (status 200)
            4. Devolver un mensaje de error si algo falló (status 500)
        
    */
   try{
   const {id}= req.params.id;
   const pide= await PedidosService.getPedidoById(id)
   if (!pide){
    return res.status(404).json({error: "inexistente"});
   }
   else{
     return res.status(200).json(pide);
   }}
   catch(error){
     console.error('error para obtener pedido:', error)
     res.status(500).json({message:'error'});
   }
};

const createPedido = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el body de la request tenga el campo platos
            2. Verificar que el campo productos sea un array
            3. Verificar que el array de productos tenga al menos un producto
            4. Verificar que todos los productos tengan un id y una cantidad
            5. Si algo de lo anterior no se cumple, devolver un mensaje de error (status 400)
            6. Crear un pedido con los productos recibidos y el id del usuario (utilizando el servicio de pedidos)
            7. Devolver un mensaje de éxito (status 201)
            8. Devolver un mensaje de error si algo falló (status 500)
        
    */

            try{
                const {platos}= req.body;
                if(!platos||!Array.isArray({platos})||platos.length==0){
                 return res.status(400).json({error: 'no se cumplen las condiciones'});
                }
                else{
                   platos.forEach(platos=> {
                    if(!platos.id||!productos.cantidad){
                        return res.status(400).json({error:'error'});
                    }
                   });
                   try{
                   const userid= req.id;
                   const pedidonNuevo= await pedidosService.createPedido({platos,userid});
                   return res.status(201).json({message: 'exito'});

                   }
                   catch(error){
                    console.error('error creando pedido', error);
                    res.status(500).json({error: 'error'});
                   }
                }

            }
            catch(error){
                console.error('error creando pedido', error);
                res.status(500).json({error: 'error'});
            }
};

const aceptarPedido = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, verificar que el pedido esté en estado "pendiente"
            4. Si el pedido no está en estado "pendiente", devolver un mensaje de error (status 400)
            5. Si el pedido está en estado "pendiente", actualizar el estado del pedido a "aceptado"
            6. Devolver un mensaje de éxito (status 200)
            7. Devolver un mensaje de error si algo falló (status 500)
        
    */
   try{
    const {id}= req.params.id;
    const pedido= await pedidosService.getPedidoById(id);
    if(!pedido){
        return res.status(404).json({error:'not found'});
    }
    else{
        if(pedido.estado=! 'pendiente' ){
            return res.status(400).json({error:'error'});
        }
        else{
            pedido.estado= 'aceptado';
            return res.status(200).json({message: 'exito'});
        }
    }
   }
   catch(error){
    console.error('error',error);
    return res.status(500).json({error: 'error'});
   }
};

const comenzarPedido = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, verificar que el pedido esté en estado "aceptado"
            4. Si el pedido no está en estado "aceptado", devolver un mensaje de error (status 400)
            5. Si el pedido está en estado "aceptado", actualizar el estado del pedido a "en camino"
            6. Devolver un mensaje de éxito (status 200)
            7. Devolver un mensaje de error si algo falló (status 500)
        
    */
   try{
   const {id}= req.params.id;
   const pedido= await pedidosService.getPedidoById(id);
   if(!pedido){
    return res.status(404).json({error:'pedido no encontrado'});
   }
   else{
     if(pedido.estado=!'aceptado')
        return res.status(400).json({error:'error'});
    else{
        pedido.estado= 'en camino';
        await pedidosService.updatePedido(pedido.estado);
        return res.status(200).json({message: 'exito'});

    }
   }}
   catch(error){
    console.error('error', error);
    return res.status(500).json({error: 'error'});
   }
   

};

const entregarPedido = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, verificar que el pedido esté en estado "en camino"
            4. Si el pedido no está en estado "en camino", devolver un mensaje de error (status 400)
            5. Si el pedido está en estado "en camino", actualizar el estado del pedido a "entregado"
            6. Devolver un mensaje de éxito (status 200)
            7. Devolver un mensaje de error si algo falló (status 500)
        
    */
   try{
    const{id}= req.params.id;
    const pedido= await pedidosService.getPedidoById(id);
    if(!pedido){
        return res.status(404).json({error: 'not found'});

    }
    else{
        if(pedido.estado=!'en camino'){
            return res.status(400).json({error:'error'});
        }
        else{
            pedido.estado= 'entregado';
            const update= await pedidosService.updatePedido(pedido.estado);
            return res.status(200).json({message: 'exito'});
        }
    }
   }
   catch(error){
    console.error('error', error);
    return res.status(500).json({error: 'error'});
   }
};

const deletePedido = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, eliminar el pedido
            4. Devolver un mensaje de éxito (status 200)
            5. Devolver un mensaje de error si algo falló (status 500)
        
    */
   try {
    const {id} = req.params.id;
    const pedido= await pedidosService.getPedidoById(id);
    if (!pedido){
        return res.status(404).json({error: 'not found'});
    }
    else{
        const borrar= await pedidosService.deletePedido(id);
        return res.status(200).json({message: 'exitosamente borrado'})
    }


   }
   catch (error){
    console.error('error',error);
    return res.status(500).json({error: 'error'});
   }
};

export default {
    getPedidos,
    getPedidosByUser,
    getPedidoById,
    createPedido,
    aceptarPedido,
    comenzarPedido,
    entregarPedido,
    deletePedido,
};
