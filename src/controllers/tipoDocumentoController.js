// const { check, validationResult } = require('express-validator');
// const bcrypt = require('bcrypt');
// const { generarJWT } = require('../helpers/tokens');
const tipoDocumentoService = require('../services/tipoDocumentoService');


exports.getAll = async (req, res) => {
    const tiposDocumentos = await tipoDocumentoService.getAll();
    //     const tokens = await userService.generateAuthTokens(user);
    res.send(tiposDocumentos);
};

