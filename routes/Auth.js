//ruta para el registro e inicio de sesion

const express = require('express')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { checkRole } = require('../middleware/role');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();


//ruta de registro



router.post( '/register',async(req,res) =>{
    const{ nombre, email, password} = req.body;
   
    try{
       
        //verificamos si el usuario ya existe
        const userExists = await User.findOne({email});
        if( userExists){
            return res.status(400).json({ message: 'Usuario ya existente'});
        } 

        //encriptamos la contraseña
        const hashedPassword = await bcryptjs.hash(password,10);

        //crear el nuevo usuario
        const newUser = new User({ nombre, email, password: hashedPassword })
        await newUser.save();

        res.status(200).json({ message: 'Usuario registrado'})
    }catch (error){
        console.error('error al registrar el usuario:', error)
        res.status(500).json({ message: 'Error al registrar el suauario:', error})
    }
    
});



//ruta de inicio de sesion

router.post('/login', async(req,res)=>{
    const {email, password} = req.body;
    try{
        //buscar el usuario en base de datos
        const user = await User.findOne({ email});
        if(!user){
            return res.status(400).json({message: 'usuario no encontrado'})
        }

        //verifico la contraseña
        const isMatch = await bcryptjs.compareSync( password, user.password); //regresa un booleano
        if(!isMatch){
            return res.status(400).json({message: 'Contraseña invalida - password' })
        }

        //genero el tocken 
        const token = jwt.sign({ id: user._id }, 'secretkey', {expiresIn: '1h'} )
        res.status(200).json({ token })
    }catch(error){
        res.status(500).json({ message: 'Error al iniciar sesion', error})
    }


    /*ruta de control de rol

    router.get('/admin-data', isAuthenticated, checkRole(['admin']), (req,res)=>{
        res.status(200).json({message:'datos como admin'})
    })*/
}) 

module.exports = router;