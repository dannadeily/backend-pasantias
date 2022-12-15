const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../config/conexion');
const Usuario = db.define('usuarios', {
    idusuario: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    roles_idrol: {
        type: DataTypes.INTEGER(11),
        allowNull: true
    },
    idtipo_documento: {
        type: DataTypes.INTEGER(11),
        allowNull: true
    },
    nombres: {
        type: DataTypes.STRING(40),
        allowNull: true
    },
    apellidos: {
        type: DataTypes.STRING(40),
        allowNull: true
    },
    numero_identificacion: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    codigo: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: 0
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
    semestre: {
        type: DataTypes.STRING(2),
        allowNull: true
    },
    direccion: {
        type: DataTypes.STRING(60),
        allowNull: true
    },
}, {
    hooks: {
        beforeCreate: async function (usuario) {
            const salt = await bcrypt.genSalt(10);
            usuario.password = await bcrypt.hash(usuario.password, salt);
        }
    }
});

module.exports = Usuario;