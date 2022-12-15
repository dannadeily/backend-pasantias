const {DataTypes} = require('sequelize');
const db = require('../config/conexion');
const Documento = db.define('documentos',{
    iddocumento: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    documento: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    ruta: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    aprobacion: {
        type: DataTypes.BOOLEAN,
        allowNull: false, 
        default:0
    },tipos_formatos_idformato:{
        type: DataTypes.INTEGER(11),
        allowNull: false,
    }
},{
    timestamps:false
});

module.exports = Documento;