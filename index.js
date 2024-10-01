const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');
const formularioRoutes = require('./routes/Formulario');  //importo las rutas
const authRoutes = require('./routes/Auth');  // Importa las rutas de autenticación




const app = express();

//rutas

app.use(cors({
    origin: 'http://localhost:4200'
})); //Me permite las solicitudes desde el front
app.use(bodyParser.json())  //Pareseo las solicitudes en formato JSON

//uso las rutas del form
app.use('/api/formulario', formularioRoutes);

//uso las rutas del auth que tiene registro y login
app.use('/api/auth', authRoutes)



//conexiones a Mongo

mongoose.connect('mongodb://127.0.0.1:27017/formulario',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
}).then(()=>console.log('Conexion exitosa a MongoDB'))
.catch( err => console.log('No se puede conectar a MongoDB: ', err));

  //Server

  const PORT = process.env.PORT || 3000;

//Iniciar server

    app.listen(PORT, () =>{
        console.log(`Servidor activo en puerto ${PORT}`)
    });



