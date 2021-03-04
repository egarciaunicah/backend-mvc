const express = require('express');
const router = express.Router();
const { modelName } = require('../../models/usuario');
const Usuario = require('../../models/usuario');

//API para insertar un nuevo usuarios

router.post('/insert_usuario', (req, res) => {
    try {
        const carro = new Usuario(req.body);
        carro.save();
        res.status(200).json({resultado: 'Usuario Agregado'});
    }
    catch(error){
        console.log('Error al insertar el documento en MongoDB');
    }
})

//Consultas la informacion de la base de datos, todos los documentos.
router.get('/get_usuarios', async (req, res) => {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
});

//Modificar la informacion de un carro
router.put('/update_usuario', async (req, res) => {
    const cid = req.body.id;

    const usuarioDB = await Usuario.findById(cid);
    if(!usuarioDB){
        res.status(404).json({
            msg: 'No existe el carro a modificar'
        });
    }

    const datos = req.body;
    delete datos.email;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(cid, datos, {new:true});

    res.status(200).json({carro: usuarioActualizado});
});

//Borrar un carro

router.delete('/delete_usuario', async(req, res) => {
    const cid = req.query.id;

    const usuarioDB = await Usuario.findById(cid);
    if(!usuarioDB){
        res.status(404).json({
            msg: 'No existe el usuario'
        });
    }

    await Usuario.findByIdAndDelete(cid);
    res.status(200).json({msj: 'Usuario Borrado'});

});


module.exports = router;

