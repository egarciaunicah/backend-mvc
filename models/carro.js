const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Carro = new Schema({
    placa: String,
    color: String,
    marca: String,
    modelo: String
});

const model = mongoose.model('Vehiculos', Carro);

module.exports = model;

