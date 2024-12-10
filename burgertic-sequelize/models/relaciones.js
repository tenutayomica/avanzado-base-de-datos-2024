import { Pedido } from "./pedidos.model";
import {Usuario} from "./usuarios.model";
Usuario.hasMany(Pedido);
Pedido.belongsToMany(Usuario);