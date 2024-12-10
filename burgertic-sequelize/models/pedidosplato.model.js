import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";
import { Pedido } from '../models/pedidos.model.js';
import {Plato} from '../models/platos.model.js';
export class PlatosXPedidos extends Model {}

PlatosXPedidos.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        cantidad: {
            type: DataTypes.INTEGER
        }
    },
    {
        sequelize,
        modelName: "pedidos_platos",
        timestamps: false,
    }
);

console.log("****************** SE LLAMA!!!")