//esquema de los datos que guardamos

const mongoose = require('mongoose');

//esquema

const FormularioSchema = new mongoose.Schema({

    nombre: {
        type: String,
        require: true
    },
    dni: {
        type: Number,
        require: true,
        minlength: 6
    },
    edad: {
        type: Number,
        require: true,
        min: 18
    },
    hijos: {
        tieneHijos:{
            type: String,
            require: true
        },
        cantidad: {
            type:Number,
            default: 0
        }
    },
});

//Creo y exporto el modelo

module.exports = mongoose.model('Formulario', FormularioSchema);