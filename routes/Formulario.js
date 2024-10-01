const express = require('express')
const Formulario = require('../models/Formularios');
const auth = require('../middleware/auth')
const router = express.Router();



//PROTEJO LA RUTA GET utilizando el middleware auth


//ruta en la que creo un registro
router.post('/', async (req,res) => {
    try{
        console.log('Datos recibidos:', req.body);  // Verificar los datos recibidos desde Postman
        const nuevoFormulario = new Formulario(req.body); //creo un nuevo regristro
        console.log('Nuevo formulario creado:', nuevoFormulario);  // Verifica el objeto creado
        const formularioGuardado = await nuevoFormulario.save(); //guardo en mongo
        console.log('Formulario guardado:', formularioGuardado);  // Verifica si el guardado fue exitoso
        res.status(201).json(formularioGuardado) //envio la respuesta con el registro guardado
    }catch(error){
        console.error('Error al guardar formulario: ', error)
        res.status(400).json({ message: 'Se proujo un error al guardar los datos', error: error.message })
    }
});

//ruta para obtener los registros

router.get('/', async (req,res) => { //paginacio y limite de paginas
    try{
    const page = parseInt(req.query.page) || 1 //pagina por defecto
    const limit = parseInt(req.query.limit) || 5  //limite de ELEMENTOS por pagina


    const skip = ( page - 1 ) * limit; //calculo cuanto voy cambiando al paginar

    const formularios = await Formulario.find()
    .skip(skip) // salto los primeros skip
    .limit(limit) // limito los resultado al valor de limit

    const totalFormularios = await Formulario.countDocuments(); // countDocuments cuenta el total de documentos en la base de datos
    
    res.status(200).json({
        formularios,
        totalPages: Math.ceil( totalFormularios / limit ), //numero total de paginas
        currentPage: page //pagina actua
    });

    } catch (error){
        res.status(500).json({ message: 'Error al obtener el formulario', error})
    }
});


 /*   try{
  const formularios = await Formulario.find();
        res.status(200).json(formularios);
    }catch(error){
        res.status(500).json({ message: 'Error al obtener los datos', error })
    }*/


//ruta para modificar

router.put('/:id', async (req, res) => {
    try {
        const formularioActualizado = await Formulario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!formularioActualizado) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }
        res.status(200).json(formularioActualizado);
    } catch (error) {
        console.error('Error al actualizar el registro:', error);
        res.status(500).json({ message: 'Se produjo un error al actualizar el registro', error: error.message });
    }
});


//ruta para eliminar
router.delete('/:id', async (req, res) => {
    try {
        const formularioEliminado = await Formulario.findByIdAndDelete(req.params.id);
        if (!formularioEliminado) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }
        res.status(200).json({ message: 'Registro eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el registro:', error);
        res.status(500).json({ message: 'Se produjo un error al eliminar el registro', error: error.message });
    }
});

module.exports = router;

