import jwt from "jsonwebtoken";
import UsuariosService from "../services/usuarios.service.js";
import usuariosService from "../services/usuarios.service.js";

export const verifyToken = async (req, res, next) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar si hay un token en los headers de autorización
            2. Verificar que el token esté en el formato correcto (Bearer <token>)
            3. Verificar que el token sea válido (utilizando la librería jsonwebtoken)
            4. Verificar que tenga un id de usuario al decodificarlo
    
        Recordar también que si sucede cualquier error en este proceso, deben devolver un error 401 (Unauthorized)
    */
        
        try{
        const jwtoken = req.headers.authorization.slice(7);
        console.log("jwt", jwtoken)
        if(!jwtoken){
            return res.status(401).json({error: "No token"});
            
        }
        else{
        try {
    
          const payload = await jwt.verify(jwtoken, process.env.JWT_SECRET)
          console.log("Desencriptado:", payload)
          req.id=payload.userid
          next();
        }
        catch(error) {
          console.log("error jwt",e)
          res.send("Error jwt")
        }}}
        catch(error){console.log()}
};

export const verifyAdmin = async (req, res, next) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el id de usuario en la request es un administrador (utilizando el servicio de usuarios)
            2. Si no lo es, devolver un error 403 (Forbidden)
    
    */
   try{
    const verifiedUserid= req.id
    const admin= await usuariosService.getUsuarioById(verifiedUserid);
    if(!admin){
        return req.status(403).json({error: 'no autorizado'})
    }
    else{
        next();
    }

   }
   catch(error){
    console.log('error');
   }
};
