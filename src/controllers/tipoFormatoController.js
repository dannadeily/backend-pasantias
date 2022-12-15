// const { check, validationResult } = require('express-validator');
// const bcrypt = require('bcrypt');
// const { generarJWT } = require('../helpers/tokens');
const tipoFormatoService = require('../services/tipoFormatoService');


exports.getAll = async (req, res) => {
    const tiposFormatos = await tipoFormatoService.getAll();
    //     const tokens = await userService.generateAuthTokens(user);
    res.send(tiposFormatos);
};

