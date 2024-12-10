import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";
export class Usuario extends Model {}


Usuario.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING(50),
        },
        apellido: {
            type: DataTypes.STRING(50),
        },
        email: {
            type: DataTypes.STRING(256),
        },
        password: {
            type: DataTypes.STRING(256),
        }, 
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    },
   
    {
        sequelize,
        modelName: "usuarios",
        timestamps: false,
    },
     
);

