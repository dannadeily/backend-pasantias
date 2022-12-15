// const { check, validationResult } = require('express-validator');
// const bcrypt = require('bcrypt');
// const { generarJWT } = require('../helpers/tokens');
const actividadService = require('../services/actividadService');


exports.getAll = async (req, res) => {
    const actividades = await actividadService.getAll();
    //     const tokens = await userService.generateAuthTokens(user);
    res.send(actividades);
};

