const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Usuario = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

const model = mongoose.model('usuario', Usuario);

module.exports = model;
