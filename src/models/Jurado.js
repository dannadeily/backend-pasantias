const { DataTypes } = require('sequelize');
const db = require('../config/conexion');
const Jurados = db.define('jurados', {
    idcalificacion: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    usuarios_idusuario: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    pasantes_idpasante: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    nota: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    numero_jurado:{
        type: DataTypes.INTEGER(11),
        allowNull: false
    }
},);

module.exports = Jurados;