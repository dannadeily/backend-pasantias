const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const generarJWT = (id) =>  jwt.sign({
        id
    }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

    module.exports = {
        generarJWT
    }