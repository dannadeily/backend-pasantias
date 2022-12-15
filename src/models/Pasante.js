const { DataTypes } = require('sequelize');
const db = require('../config/conexion');
const Pasante = db.define('pasantes', {
    idpasante: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    empresas_idempresa: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
    }, estados_idestado: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        default: 1
    }, usuarios_idusuario: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
    }
},);

module.exports = Pasante;