const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Usuario = require('../models/Usuario');
dotenv.config({ path: './.env' });

module.exports = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        // const error = new Error('No autenticado')
        // error.statusCode=401;
        // throw error;
        return res.json({ status: 401, message: 'No autenticado' });
    }
    //obtener el token
    const token = authHeader.split(' ')[1];
    let revisarToken = false;
    try {
        revisarToken = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = await Usuario.findByPk(revisarToken.id);
    } catch (error) {
        console.log(error);
        return res.json({ status: 401, message: 'inicia sesión nuevamente' });
    }
    //si es valido pero hay algun error
    if (!revisarToken) {
        // const error = new Error('No autenticado');
        // error.statusCode= 401;
        // throw error;
        
        return res.json({ status: 401, message: 'No autenticado' });
    }
    next();
};