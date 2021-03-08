const express = require('express');
const router = express.Router();
const { modelName } = require('../../models/usuario');
const Usuario = require('../../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//API para insertar un nuevo usuarios

router.post('/insert_usuario', (req, res) => {
    try {
        const usuario = new Usuario(req.body);

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(usuario.password, salt);
        
        usuario.save();
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

//Borrar un usuario

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

router.post('/login', async(req, res) => {
    
    const usuario = req.body;

    try {

        const usuarioDB = await Usuario.findOne({
            email: usuario.email
        });

        if(!usuarioDB){
            return res.status(404).json({msg: 'El Email no esta registrado en el sistema'});
        }

        const validPassword = bcrypt.compareSync(usuario.password, usuarioDB.password);
        if(!validPassword){
            return res.status(400).json({msg: 'Contraseña inválida'});
        }

        //Generar y devolver token

        const payload = usuarioDB.email;
        const secretJwt = 'Semin@ri0';

        const token = jwt.sign(payload, secretJwt);

        res.json({
            token
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error en la autenticacion'});
    }

})


module.exports = router;

