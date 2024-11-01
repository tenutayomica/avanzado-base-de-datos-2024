import UsuariosService from "../services/usuarios.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import usuariosService from "../services/usuarios.service.js";
const register = async (req, res) => {
    // --------------- COMPLETAR ---------------
    

        //Recordar que para cumplir con toda la funcionalidad deben:

            //1. Verificar que el body de la request tenga el campo usuario
            
            //2. Verificar que el campo usuario tenga los campos nombre, apellido, email y password

            //3. Verificar que no exista un usuario con el mismo email (utilizando el servicio de usuario)
            //4. Devolver un mensaje de error si algo falló hasta el momento (status 400)
            //5. Hashear la contraseña antes de guardarla en la base de datos
            
            //6. Guardar el usuario en la base de datos (utilizando el servicio de usuario)
            //7. Devolver un mensaje de éxito si todo salió bien (status 201)
            //8. Devolver un mensaje de error si algo falló guardando al usuario (status 500)


    const { nombre, apellido, email, password } = req.body;
    console.log(nombre, apellido, email, password);
    if (!nombre || !apellido || !email || !password) {
        return res.status(400).json({ error: 'Datos de usuario incompletos' });}
    
    else{
    try {
        
        const userExists = await UsuariosService.getUsuarioByEmail(email);
        if (userExists) {
            return res.status(409).json({ error: 'El usuario ya existe' });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            password: hashedPassword,
        }
    ;

        
        const savedUser = await usuariosService.createUsuario;

        res.status(201).json({ message: 'Usuario creado exitosamente', user: savedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar al usuario' });
    }
    
}};


const login = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el body de la request tenga el campo email y password
            2. Buscar un usuario con el email recibido
            3. Verificar que el usuario exista
            4. Verificar que la contraseña recibida sea correcta
            5. Devolver un mensaje de error si algo falló hasta el momento (status 400)
            6. Crear un token con el id del usuario y firmarlo con la clave secreta (utilizando la librería jsonwebtoken)
            7. Devolver un json con el usuario y el token (status 200)
            8. Devolver un mensaje de error si algo falló (status 500)
        
    */
   const {email, password} = req.body;
   console.log(email, password);
   if (!email||!password){
    return res.status(400).json({error: 'Se requiere email y contraseña'});
   }
   else{
    try{
       const user = await usuariosService.getUsuarioByEmail(email);
       if (!user){ return res.status(400).json({error: 'invalid user'})}
       const checkPassword = await bcrypt.compare(password, user.password);
       if(!checkPassword){
        return res.status(400).json({error: 'invalid password'})
       }
       else{
        const token = jwt.sign({userid:user.userid},process.env.JWT_SECRET,{ expiresIn: '1h' });
        res.status(200).json({user,token}); 
       }
    }
    catch(error) {
        console.error(error);
        res.status(500).json({error: 'unable to login'})
    }
   }
};

export default { register, login };
