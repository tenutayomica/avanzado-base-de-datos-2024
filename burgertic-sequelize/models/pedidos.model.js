import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";
export class Pedido extends Model {}

Pedido.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fecha: {
            type: DataTypes.DATE,
        },
        estado: {
            type: DataTypes.ENUM('pendiente', 'aceptado', 'en camino', 'entregado')

        }
    },
    {
        sequelize,
        modelName: "pedidos",
        timestamps: false,
    }
);
