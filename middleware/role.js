const User = require('../models/User')



const verifyRole = (rolesPermitidos) =>{
    return (req, res, next) =>{
        try{

            const user = req.user; //tendria q tener la info del usuario en rq.user 
            
            if( !rolesPermitidos.includes(user.rol)){
                return res.status(403).json({message: 'acceso denegado. sin permisos'})
        }
        next();

        }catch{
            
            return res.status(500).json({ message: 'error en el servidor'})
        }

    }
}
module.exports = {verifyRole};