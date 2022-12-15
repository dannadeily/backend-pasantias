const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../config/conexion');
const Empresa = db.define('empresas', {
    idempresa: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    sector_empresas_idsector_empresa: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    actividades_idactividad: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    razon_social: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    nit: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(70),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    direccion: {
        type: DataTypes.STRING(60),
        allowNull: true
    },
    activa:{
        type :DataTypes.BOOLEAN,
        allowNull: true
    },
    convenio: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
}, {
    hooks: {
        beforeCreate: async function (empresa) {
            const salt = await bcrypt.genSalt(10);
            empresa.password = await bcrypt.hash(empresa.password, salt);
        }
    }
});

module.exports = Empresa;