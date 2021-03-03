const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { modelName } = require('../../models/carro');

const Carro = require('../../models/carro');

//mongodb+srv://<usuario>:<clave>@cluster0.lghyo.mongodb.net/test

try {
    mongoose.connect('mongodb+srv://<usuario>:<clave>@cluster0.lghyo.mongodb.net/test', {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    console.log('Conectado a MongoDB satisfactoriamente!!');

}
catch(error){
    console.log('Ocorrio un error al conectarse al cluster de Mongo Atlas: ' + error);
}

//API para insertar un nuevo carro

router.post('/insert_carro', (req, res) => {
    try {
        const carro = new Carro(req.body);
        carro.save();
        res.status(200).json({resultado: 'Carro Agregado'});
    }
    catch(error){
        console.log('Error al insertar el documento en MongoDB');
    }
})

//Consultas la informacion de la base de datos, todos los documentos.
router.get('/get_carros', async (req, res) => {
    const carros = await Carro.find();
    res.status(200).json(carros);
});

//Modificar la informacion de un carro
router.put('/update_carro', async (req, res) => {
    const cid = req.body.id;

    const carroDB = await Carro.findById(cid);
    if(!carroDB){
        res.status(404).json({
            msg: 'No existe el carro a modificar'
        });
    }

    const datos = req.body;
    delete datos.placa;

    const carroActualizado = await Carro.findByIdAndUpdate(cid, datos, {new:true});

    res.status(200).json({carro: carroActualizado});
});

//Borrar un carro

router.delete('/delete_carro', async(req, res) => {
    const cid = req.query.id;

    const carroDB = await Carro.findById(cid);
    if(!carroDB){
        res.status(404).json({
            msg: 'No existe el carro'
        });
    }

    await Carro.findByIdAndDelete(cid);
    res.status(200).json({msj: 'Carro Borrado'});

});


module.exports = router;

