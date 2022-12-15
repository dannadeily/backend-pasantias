const documentosCargadosService = require('../services/documentoCargadoService');


exports.cargarDocumentos = async (req, res)=>{

    if(req.files === null) return res.json ({
        status:400, message:'Por favor cargue un archivo'
    });
    const {idusuario} = req.params;
    const documentos = await documentosCargadosService.cargarDocumentos(req.files,idusuario);
    res.json (documentos);
};


exports.getDocumentosCargadosIniciales = async (req, res)=>{
    const {idusuario} = req.params;
    const documentos = await documentosCargadosService.getDocumentosCargadosIniciales(idusuario);
    res.json(documentos);
};

exports.getDocumentosCargadosInicialesByPasante = async (req, res)=>{
    const {idpasante} = req.params;
    const documentos = await documentosCargadosService.getDocumentosCargadosIniciales(idpasante, true);
    res.json(documentos);
};

exports.getDocumentosCargadosAvances = async (req, res)=>{
    const {idusuario} = req.params;
    const documentos = await documentosCargadosService.getDocumentosCargadosAvances(idusuario);
    res.json(documentos);
};

exports.getDocumentosCargadosAvancesByPasante = async (req, res)=>{
    const {idpasante} = req.params;
    const documentos = await documentosCargadosService.getDocumentosCargadosAvances(idpasante, true);
    res.json(documentos);
};

exports.getDocumentosCargadosFinales = async (req, res)=>{
    const {idusuario} = req.params;
    const documentos = await documentosCargadosService.getDocumentosCargadosFinales(idusuario);
    res.json(documentos);
};

exports.getDocumentosCargadosFinalesByPasante = async (req, res)=>{
    const {idpasante} = req.params;
    const documentos = await documentosCargadosService.getDocumentosCargadosFinales(idpasante, true);
    res.json(documentos);
};