const {DataTypes} = require('sequelize');
const db = require('../config/conexion');
const TipoDocumento = db.define('tipos_documentos',{
    idtipo_documento: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    tipo_documento: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
},{
    timestamps:false
});

module.exports = TipoDocumento;