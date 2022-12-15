const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const app= express();
const db = require('./config/conexion');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(fileUpload());



try {
    db.authenticate();
    db.sync();
    console.log('Conexion a la base de datos avanzo correcta ');
} catch (error) {
    console.log(error);
}
// rutas
app.use('/', require('./routes/usuario'));
app.use('/', require('./routes/tipoDocumento'));
app.use('/', require('./routes/sectorEmpresa'));
app.use('/', require('./routes/actividad'));
app.use('/', require('./routes/empresaRoutes'));
app.use('/', require('./routes/pasante'));
app.use('/', require('./routes/documento'));
app.use('/', require('./routes/tipoFormato'));
app.use('/', require('./routes/documentosCargados'));
app.use('/', require('./routes/jurado'));

app.use(express.static('files'));

app.listen(PORT , ()=>{
    console.log(`server listening on port ${PORT}` );
});