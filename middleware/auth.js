//aca verificamos el token y protejo las rutas
const jwt = require('jsonwebtoken');

const auth = (req,res,next) => {
    const token = req.header('Authorization');
    if(!token){
        res.status(401).json({message: 'Acceso denegado'})
    }
    try{
        const verified = jwt.verify(token, 'secretkey');
        req.user = verified;
        next(); //te deja seguir a la siguiente funcion
    }catch(error){
        res.status(400).json({message: 'Token incorrecto'})
    }
}