const express = require('express');
const os = require('os');

const app = express();

const port = "8080";

app.use(express.static('dist'));
app.get('/api/serverinfo', (req, res) => res.send({ OsType: os.type() }));
app.get('/api/serverport', (req, res) => res.send({ Port: port }));


app.listen(port, () => console.log('Listening on port '+port+'!'));
