var Vehiculo = require('../../models/vehiculo');

exports.vehiculo_list = function(req, res){
    res.status(200).json({
        vehiculos: Vehiculo.allVehiculos
    });
}

exports.vehiculo_create = function(req, res){
    var vehi = new Vehiculo(req.body.id, req.body.color, 
                            req.body.marca, req.body.modelo);
    
    Vehiculo.add(vehi);

    res.status(200).json({
        vehiculo:vehi
    });

}

exports.vehiculo_delete = function(req, res){
    Vehiculo.RemoveById(req.body.id);
    res.status(204).send();
}

//API para modificar informacion de vehiculos.

exports.vehiculo_update = function(req, res){

    var vehi = Vehiculo.findById(req.body.id);

    vehi.id = req.body.id;
    vehi.color = req.body.color;
    vehi.marca = req.body.marca;
    vehi.modelo = req.body.modelo;

    res.status(200).json({
        vehiculo: vehi
    });

}
