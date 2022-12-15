const {DataTypes} = require('sequelize');
const db = require('../config/conexion');
const TipoFormato = db.define('tipos_formatos',{
    idformato: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    formato: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
},{
    timestamps:false
});

module.exports = TipoFormato;