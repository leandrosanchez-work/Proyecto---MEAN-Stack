//en este modelo guardaremos en mongo el correo y contraseña del user

const mongoose = require ('mongoose');

const UserSchema = new mongoose.Schema({

    nombre:{
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    /*rol:{
        type: string,
        enum: ['admin', 'user'], //roles disponibles
        default: 'user' //rol por defecto
    }*/
})

module.exports = mongoose.model('User', UserSchema)