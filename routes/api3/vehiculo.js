const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { modelName } = require('../../models/carro');

const Carro = require('../../models/carro');

try {
    mongoose.connect('mongodb+srv://egarcia:admin123@cluster0.lghyo.mongodb.net/test', {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    console.log('Conectado a MongoDB satisfactoriamente!!');

}
catch(error){
    console.log('Ocorrio un error al conectarse al cluster de Mongo Atlas: ' + error);
}

module.exports = router;

