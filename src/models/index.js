const TipoDocumento = require('./TipoDocumento');
const Usuario = require('./Usuario');
const Pasante = require('./Pasante');
const Actividad = require('./Actividad');
const RazonSocial = require('./SectorEmpresa');
const Empresa = require('./Empresa');
const DocumentoCargado = require('./DocumentoCargado');
const Documentos = require('./Documento');
const Jurados= require('./Jurado');

//! relacion entre Tipo de documento y usuario

Usuario.belongsTo(TipoDocumento, {
    foreignKey : 'idtipo_documento'
});

TipoDocumento.hasMany(Usuario,{
    foreignKey : 'idtipo_documento'
});

//!relacion entre usuario y pasante
Pasante.belongsTo(Usuario, {
    foreignKey : 'usuarios_idusuario'
});

Usuario.hasMany(Pasante,{
    foreignKey : 'usuarios_idusuario'
});

//! relacion entre empresa y pasante

Pasante.belongsTo(Empresa, {
    foreignKey : 'empresas_idempresa'
});

Empresa.hasMany(Pasante,{
    foreignKey : 'empresas_idempresa'
});

//! relacion entre documentos y documentos cargados

DocumentoCargado.belongsTo(Documentos, {
    foreignKey : 'documentos_iddocumento'
});

Documentos.hasMany(DocumentoCargado,{
    foreignKey : 'documentos_iddocumento'
});

//! relacion entre JURADOS y USUARIOS

Jurados.belongsTo(Usuario, {
    foreignKey : 'usuarios_idusuario'
});

Usuario.hasMany(Jurados,{
    foreignKey : 'usuarios_idusuario'
});

//! RELACION ENTRE JURADO Y PASANTE

Jurados.belongsTo(Pasante, {
    foreignKey : 'pasantes_idpasante'
});

Pasante.hasMany(Jurados,{
    foreignKey : 'pasantes_idpasante'
});

//! relacion entre pasantes y documentos cargados

DocumentoCargado.belongsTo(Pasante, {
    foreignKey : 'pasantes_idpasante'
});

Pasante.hasMany(DocumentoCargado,{
    foreignKey : 'pasantes_idpasante'
});


module.exports={
    TipoDocumento,
    Usuario,
    Pasante,
    Actividad,
    RazonSocial, 
    Empresa,
    DocumentoCargado,
    Documentos, 
    Jurados
};