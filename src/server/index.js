const express = require('express');
const os = require('os');

const app = express();

app.use(express.static('dist'));
app.get('/api/serverinfo', (req, res) => res.send({ OsType: os.type() }));


app.get('/api/serverinfo2', (req, res) => res.send({ OsType: "test" }));

app.listen(8080, () => console.log('Listening on port 8080!'));
