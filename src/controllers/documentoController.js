const documentosService = require('./../services/documentoService');

exports.crearDocumento = async (req, res)=>{

    const { nombre, aprobacion, formato} = req.body;
    console.log(req.body);
    const documento= req.files.plantilla;
    res.json(await  documentosService.crearDocumento(nombre,documento,aprobacion, formato));
};

exports.getDocumentosIniciales =async (req, res)=>{
    try {
        const documentos= await documentosService.getDocumentosIniciales();
        res.json(documentos);
    } catch (error) {
        console.log(error);
        res.json( {status:500, message: 'Ha ocurrido un error , por favor intenta mas tarde'});
    }
};

exports.getDocumentosAvances =async (req, res)=>{
    try {
        const documentos= await documentosService.getDocumentosAvances();
        res.json(documentos);
    } catch (error) {
        console.log(error);
        res.json( {status:500, message: 'Ha ocurrido un error , por favor intenta mas tarde'});
    }
};

exports.getDocumentosFinales =async (req, res)=>{
    try {
        const documentos= await documentosService.getDocumentosFinales();
        res.json(documentos);
    } catch (error) {
        console.log(error);
        res.json( {status:500, message: 'Ha ocurrido un error , por favor intenta mas tarde'});
    }
};