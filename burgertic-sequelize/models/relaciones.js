import { Pedido } from "./pedidos.model.js";
import {Usuario} from "./usuarios.model.js";
import {Plato} from "./platos.model.js";
import { PlatosXPedidos } from "./pedidosplato.model.js";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

export const crearRelaciones = async() => {
Usuario.hasMany(Pedido);
Pedido.belongsTo(Usuario);
Pedido.belongsToMany(Plato,{through:PlatosXPedidos});
Plato.belongsToMany(Pedido,{through:PlatosXPedidos});
await sequelize.sync({alter: "true"});
}