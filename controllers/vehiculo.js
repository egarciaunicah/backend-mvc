var Vehiculo = require('../models/vehiculo');

exports.vehiculo_list = function (req, res) {
    res.render('vehiculos/index', { vehis: Vehiculo.allVehiculos })
}

exports.vehiculo_create_get = function (req, res) {
    res.render('vehiculos/create');
}


exports.vehiculo_create_post = function (req, res) {
    var vehi = new Vehiculo(req.body.id, req.body.color,
        req.body.marca, req.body.modelo);

    Vehiculo.add(vehi);

    res.redirect('/vehiculos');
}

exports.vehiculo_delete_post = function(req, res){
    Vehiculo.RemoveById(req.body.id);

    res.redirect('/vehiculos');
    
}


exports.vehiculo_update_get = function(req, res){
    var vehi = Vehiculo.findById(req.params.id);
    res.render('vehiculos/update', {vehi});
}


exports.vehiculo_update_post = function(req, res){
    
    var vehi = Vehiculo.findById(req.params.id);

    vehi.id = req.body.id;
    vehi.color = req.body.color;
    vehi.marca = req.body.marca;
    vehi.modelo = req.body.modelo;

    res.redirect('/vehiculos');

    
}