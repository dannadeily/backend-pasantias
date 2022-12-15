const {DataTypes} = require('sequelize');
const db = require('../config/conexion');
const Actividad = db.define('actividades',{
    idactividad: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    actividad: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
},{
    timestamps:false
});

module.exports = Actividad;