const { DataTypes } = require('sequelize');
const db = require('../config/conexion');
const DocumentoCargado = db.define('documentos_cargados', {
    iddocumento_cargado: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    documentos_iddocumento: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    pasantes_idpasante: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    ruta: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = DocumentoCargado;