import { config } from "../db.js";
import pkg from "pg";
import { Usuario } from "../models/usuarios.model.js";
const { Client } = pkg;

/*const getUsuarioByEmail = async (email) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "SELECT * FROM usuarios WHERE email = $1",
            [email]
        );
        if (rows.length < 1) return null;

        await client.end();
        return rows[0];
    } catch (error) {
        await client.end();
        throw error;
    }
};*/
const getUsuarioByEmail = async (email)=>{
   try{
    const usuario= await Usuario.findOne({where:{email:email,}});
   return usuario;
}
catch(error){
    throw error;
}}
     
    
    
    

/*const getUsuarioById = async (id) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "SELECT * FROM usuarios WHERE id = $1",
            [id]
        );
        if (rows.length < 1) return null;

        await client.end();
        return rows[0];
    } catch (error) {
        await client.end();
        throw error;
    }
};*/
const getUsuarioById = async (id)=>
        await Usuario.findByPk(id);
    
/*const createUsuario = async (usuario) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "INSERT INTO usuarios (nombre, apellido, email, password, admin) VALUES ($1, $2, $3, $4, false)",
            [usuario.nombre, usuario.apellido, usuario.email, usuario.password]
        );

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};*/

const createUsuario = async (usuario) =>
    Usuario.create({
        nombre: usuario.nombre, 
        apellido: usuario.apellido,
        email: usuario.email,
        password: usuario.password,
    });

export default { getUsuarioByEmail, getUsuarioById, createUsuario };
