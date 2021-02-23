var express = require('express');
var router = express.Router();

var mysql = require("mysql");

var con = mysql.createPool({
    host:"localhost",
    user: "root",
    password:"admin123",
    database:"vehiculos",
    insecureAuth:true,
    multipleStatements:true
});

//Obtener el listado completo de vehiculos
router.get('/get_vehiculos', (req, res, next) => {
    var query = 'select * from vehiculos';
    con.query(query, (err, result, field) => {
       if(err){
           next(err);
       } else {
           res.status(200).json(result)
       }
      });
});

//Obtener un vehiculos por placa
router.get('/get_vehiculo', (req, res, next) => {
    var query = 'select * from vehiculos where placa = ?';
    var values = [req.query.placa];

    con.query(query, values, (err, result, field) => {
       if(err){
           next(err);
       } else {
           res.status(200).json(result)
       }
      });
});

//Insertar un nuevo vehiculo
router.post('/insert_vehiculo', (req, res, next) => {
    var query = 'INSERT INTO Vehiculos (placa, color, marca, modelo) values (?, ?, ?, ?)';
    var values = [req.body.placa,
                  req.body.color,
                  req.body.marca,
                  req.body.modelo];

    con.query(query, values, (err, result, field) => {
       if(err){
           next(err);
       } else {
           res.status(200).json(result)
       }
      });
});

//Modificar la informacion de un vehiculo
router.put('/update_vehiculo', (req, res, next) => {
    var query = 'Update Vehiculos set color=?, marca=?, modelo=? WHERE placa = ?';
    
    var values = [req.body.color,
                  req.body.marca,
                  req.body.modelo,
                  req.body.placa];

    con.query(query, values, (err, result, field) => {
       if(err){
           next(err);
       } else {
           res.status(200).json(result)
       }
      });
});

//Borrar un vehiculo
router.delete('/delete_vehiculo', (req, res, next) => {
    var query = 'delete from vehiculos.vehiculos where placa = ?';
    
    var values = [req.query.placa];

    con.query(query, values, (err, result, field) => {
       if(err){
           next(err);
       } else {
           res.status(200).json(result)
       }
      });
});

module.exports = router;

