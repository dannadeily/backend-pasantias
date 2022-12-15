const {DataTypes} = require('sequelize');
const db = require('../config/conexion');
const SectorEmpresa = db.define('sector_empresas',{
    idsector_empresa: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    sector: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
},{
    timestamps:false
});

module.exports = SectorEmpresa;