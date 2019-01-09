const express = require('express');
const os = require('os');
const md5 = require('md5');
var ping = require('ping');
var nslookup = require('nslookup');



var obj = {vmware: false, dns: false, dhcp: false, nas: false, asterisk: false};

const app = express();

const port = "80"; // Port du serveur en Production

app.use(express.static('dist'));
app.disable('x-powered-by');

app.get('/api/serverinfo', (req, res) => res.send({ OsType: os.type() }));
app.get('/api/serverport', (req, res) => res.send({ Port: port }));
app.get('/api/c3284d0f94606de1fd2af172aba15bf3', (req, res) => res.send({ password: true }));



app.listen(port, () => console.log('Le serveur est prêt sur le port '+port+' !'));




app.route('/api/ping').get(function(req, res, next) {
  res.json(obj);
});


function CheckPingVwmare(){
  var hosts = ['192.168.141.3'];
  hosts.forEach(function(host){
      ping.sys.probe(host, function(isAlive){
        obj.vmware = isAlive;
      });
  });
}
function CheckPingDns(){
  var hosts = ['192.168.141.3'];
  hosts.forEach(function(host){
      ping.sys.probe(host, function(isAlive){
        obj.dns = isAlive;
      });
  });
}


function CheckDns(){
  nslookup('google.fr')
    .server('8.8.8.8') // default is 8.8.8.8
    .timeout(10 * 1000) // default is 3 * 1000 ms
    .end(function (err, addrs) {
      console.log(addrs); // => ['66.6.44.4']
    });

}


setInterval(function(){
     CheckPingVwmare();
     CheckPingDns();
     CheckDns();


},1000);
