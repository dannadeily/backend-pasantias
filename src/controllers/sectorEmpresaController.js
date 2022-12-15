// const { check, validationResult } = require('express-validator');
// const bcrypt = require('bcrypt');
// const { generarJWT } = require('../helpers/tokens');
const sectorEMpresaService = require('../services/sectorEmpresaService');


exports.getAll = async (req, res) => {
    const sectoresEmpresa = await sectorEMpresaService.getAll();
    //     const tokens = await userService.generateAuthTokens(user);
    res.send(sectoresEmpresa);
};

