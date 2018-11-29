const express = require('express');
const os = require('os');
const md5 = require('md5');


const app = express();

const port = "80"; // Pour du serveur en Production

app.use(express.static('dist'));
app.disable('x-powered-by');

app.get('/api/serverinfo', (req, res) => res.send({ OsType: os.type() }));
app.get('/api/serverport', (req, res) => res.send({ Port: port }));
app.get('/api/c3284d0f94606de1fd2af172aba15bf3', (req, res) => res.send({ password: true }));



app.listen(port, () => console.log('Le serveur est prêt sur le port '+port+' !'));
