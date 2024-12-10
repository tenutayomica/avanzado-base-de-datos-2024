import { config } from "../db.js";
import pkg from "pg";
import {PlatosXPedidos} from '../models/pedidosplato.model.js';
import { Pedido } from '../models/pedidos.model.js';
import {Plato} from '../models/platos.model.js';
const { Client } = pkg;

/*const getPlatosByPedido = async (idPedido) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "SELECT * FROM pedidos_platos WHERE id_pedido = $1",
            [idPedido]
        );

        if (rows.length < 1) throw new Error("Pedido no encontrado");

        const result = await Promise.all(
            rows.map(async (plato) => {
                const { rows } = await client.query(
                    "SELECT * FROM platos WHERE id = $1",
                    [plato.id_plato]
                );

                if (rows.length < 1) throw new Error("Plato no encontrado");

                return {
                    ...rows[0],
                    cantidad: plato.cantidad,
                };
            })
        );

        await client.end();
        return result;
    } catch (error) {
        await client.end();
        throw error;
    }
};*/
const getPlatosByPedido = async (idPedido)=>{
    try{
        const pedido = await Pedido.findByPk(idPedido);
        const plato= await pedido.getPlatos();
        return plato;

    }
    catch(error){
        throw error;
    }
}
/*const getPedidos = async () => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query("SELECT * FROM pedidos");

        if (rows.length < 1) return [];

        const result = await Promise.all(
            rows.map(async (pedido) => {
                const platos = await getPlatosByPedido(pedido.id);
                return {
                    ...pedido,
                    platos,
                };
            })
        );

        await client.end();
        return result;
    } catch (error) {
        await client.end();
        throw error;
    }
};*/
const getPedidos = async () =>{
    try{
        const pedidos= await Pedido.findAll();
        pedidos.map((pedido)=>{pedido.getPlatos()})
        //pedidos.getPlatos();
    
        return pedidos;
        
    }
    catch(error){
        throw error;
    }
}
    
/*const getPedidoById = async (id) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "SELECT * FROM pedidos WHERE id = $1",
            [id]
        );

        if (rows.length < 1) return null;

        const result = rows[0];

        result.platos = await getPlatosByPedido(id);

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};*/
const getPedidoById = async (id) =>{
    
    console.log(id);
    const pedido = await Pedido.findByPk(id);
    console.log("pedido:",pedido)
    const platos= await getPlatosByPedido(pedido.id)


return {
    id:pedido.id,
    id_usuario: pedido.id_usuario,
    fecha: pedido.fecha,
    estado: pedido.estado,
    platos: platos

} 
}
/*const getPedidosByUser = async (idUsuario) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "SELECT * FROM pedidos WHERE id_usuario = $1",
            [idUsuario]
        );

        if (rows.length < 1) return [];

        const result = await Promise.all(
            rows.map(async (pedido) => {
                const platos = await getPlatosByPedido(pedido.id);
                return {
                    ...pedido,
                    platos,
                };
            })
        );

        await client.end();
        return result;
    } catch (error) {
        await client.end();
        throw error;
    }
};*/
const getPedidosByUser = async (idUsuario) => {
    try{
        const find= await Pedido.findOne({where: {id_usuario: idUsuario}});
        return{
            id: find.id,
            id_usuario: find.id_usuario,
            fecha: find.fecha,
            estado: find.estado,
            platos: await getPlatosByPedido(find.id),
        }
    }
    catch(error){
        throw error; 
    }
}
    
/*const createPedido = async (idUsuario, platos) => {
    const client = new Client(config);
    await client.connect();

    try {
        // ACÁ SE PODRÍA HACER EN ETAPAS
        // 1. Validar que los platos existan
        // 2. Crear el pedido
        // 3. Agregar los platos al pedido

        // Así, no hace falta introducir el concepto de transacciones o rollback

        const { rows } = await client.query(
            "INSERT INTO pedidos (id_usuario, fecha, estado) VALUES ($1, $2, 'pendiente') RETURNING id",
            [idUsuario, new Date()]
        );

        const idPedido = rows[0].id;

        for (let plato of platos) {
            const { rows } = await client.query(
                "SELECT * FROM platos WHERE id = $1",
                [plato.id]
            );

            if (rows.length < 1) {
                await client.query("DELETE FROM pedidos WHERE id = $1", [
                    idPedido,
                ]);
                await client.query(
                    "DELETE FROM pedidos_platos WHERE id_pedido = $1",
                    [idPedido]
                );
                throw new Error("Plato no encontrado");
            }

            await client.query(
                "INSERT INTO pedidos_platos (id_pedido, id_plato, cantidad) VALUES ($1, $2, $3)",
                [idPedido, plato.id, plato.cantidad]
            );
        }

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};*/
const createPedido = async (idUsuario, platos) =>{
    try{
        const crear= await Pedido.create({
            id_usuario: idUsuario,
            fecha: new Date(),
            estado: 'pendiente',
        })
        const agregar= await Pedido.AddPlatos
    
    }
    catch(error){
        throw error;
    }
}
    
/*const updatePedido = async (id, estado) => {
    if (
        estado !== "aceptado" &&
        estado !== "en camino" &&
        estado !== "entregado"
    )
        throw new Error("Estado inválido");

    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "UPDATE pedidos SET estado = $1 WHERE id = $2",
            [estado, id]
        );

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};*/
const updatePedido = async (id, estado) =>{
    try{
        if(estado!="aceptado"||estado!="en camino"||estado!="entregado"){
            throw new Error( "invalid");
        }
        const upup= await Pedido.findByPk(id);
        upup.estado= estado;
        await upup.save();
    }
    catch(error){
      throw error;
    }

}
/*const deletePedido = async (id) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "DELETE FROM pedidos WHERE id = $1",
            [id]
        );

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};*/
const deletePedido = async (id) =>{
    try{
        const find= await Pedido.findByPk(id);
        const borrar= await Pedido.destroy(id);

    }
    catch(error){
        throw error;
    }
}
export default {
    getPedidos,
    getPedidoById,
    getPedidosByUser,
    createPedido,
    updatePedido,
    deletePedido,
};
