const express = require('express');
const os = require('os');
const md5 = require('md5');
var ping = require('ping');
var nslookup = require('nslookup');
const app = express();
var SSH = require('simple-ssh');



//var obj = {vmware: false, dns: false, dhcp: false, nas: false, asterisk: false, };
var obj = {
  google: false
};


const port = "80"; // Port du serveur en Production

app.use(express.static('dist'));
app.disable('x-powered-by');

app.get('/api/serverinfo', (req, res) => res.send({
  OsType: os.type()
}));
app.get('/api/serverport', (req, res) => res.send({
  Port: port
}));
app.get('/api/21232f297a57a5a743894a0e4a801fc3', (req, res) => res.send({ //Mdp: admin
  password: true
}));

app.listen(port, () => console.log('Le serveur est prêt !'));


app.route('/api/ping').get(function(req, res, next) {
  res.json(obj);
});


var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(8080);

var ip_nas = "nas.solea.fr";

io.on('connection', function(socket) {
  socket.on('restaurer', function(data) {
    console.log(data);

    console.log(data.device);
    console.log(data.date);

    if (data.device == "asterisk") {
          console.log("Sauvegarde Asterisk demandé.");
          var ssh = new SSH({
            host: ip_nas,
            user: 'root', //Super la securité
            pass: 'root' //Super la securité
          });

          ssh.exec('/sharedfolders/.backups/asterisk/restauration.sh '+data.date, {
            out: function(stdout) {
              console.log(stdout);
            }
          }).start();
    } else if (data.device == "dhcp") {

          console.log("Sauvegarde DHCP demandé.");
          var ssh = new SSH({
            host: ip_nas,
            user: 'root', //Super la securité
            pass: 'root' //Super la securité
          });

          ssh.exec('/sharedfolders/.backups/dhcp/restauration.sh '+data.date, {
            out: function(stdout) {
              console.log(stdout);
            }
          }).start();

    } else if (data.device = "dns") {

          console.log("Sauvegarde DNS demandé.");
          var ssh = new SSH({
            host: ip_nas,
            user: 'root', //Super la securité
            pass: 'root' //Super la securité
          });

          ssh.exec('/sharedfolders/.backups/dns/restauration.sh '+data.date, {
            out: function(stdout) {
              console.log(stdout);
            }
          }).start();

    } else if (data.device = "nas") {

          console.log("Sauvegarde NAS demandé.");
          var ssh = new SSH({
            host: ip_nas,
            user: 'root', //Super la securité
            pass: 'root' //Super la securité
          });

          ssh.exec('/sharedfolders/.backups/nas/restauration.sh '+data.date, {
            out: function(stdout) {
              console.log(stdout);
            }
          }).start();

    } else if (data.device = "fortigate") {

          console.log("Sauvegarde Fortigate demandé.");
          var ssh = new SSH({
            host: ip_nas,
            user: 'root', //Super la securité
            pass: 'root' //Super la securité
          });

          ssh.exec('/sharedfolders/.backups/fortigate/restauration.sh '+data.date, {
            out: function(stdout) {
              console.log(stdout);
            }
          }).start();

    }

  }); //Fin socket io restauration

  socket.on('suppr', function(data) {
    console.log(data);

    console.log("Restauration : "+data.device);
    console.log(data.date);

    if (data.device == "asterisk") {
          var ssh = new SSH({
            host: ip_nas,
            user: 'root', //Super la securité
            pass: 'root' //Super la securité
          });

          ssh.exec('/sharedfolders/.backups/asterisk/suppression.sh '+data.date, {
            out: function(stdout) {
              console.log(stdout);
            }
          }).start();
    } else if (data.device == "dhcp") {

          var ssh = new SSH({
            host: ip_nas,
            user: 'root', //Super la securité
            pass: 'root' //Super la securité
          });

          ssh.exec('/sharedfolders/.backups/dhcp/suppression.sh '+data.date, {
            out: function(stdout) {
              console.log(stdout);
            }
          }).start();

    } else if (data.device = "dns") {

          var ssh = new SSH({
            host: ip_nas,
            user: 'root', //Super la securité
            pass: 'root' //Super la securité
          });

          ssh.exec('/sharedfolders/.backups/dns/suppression.sh '+data.date, {
            out: function(stdout) {
              console.log(stdout);
            }
          }).start();

    } else if (data.device = "nas") {

          var ssh = new SSH({
            host: ip_nas,
            user: 'root', //Super la securité
            pass: 'root' //Super la securité
          });

          ssh.exec('/sharedfolders/.backups/nas/suppression.sh '+data.date, {
            out: function(stdout) {
              console.log(stdout);
            }
          }).start();

    } else if (data.device = "fortigate") {

          var ssh = new SSH({
            host: ip_nas,
            user: 'root', //Super la securité
            pass: 'root' //Super la securité
          });

          ssh.exec('/sharedfolders/.backups/fortigate/suppression.sh '+data.date, {
            out: function(stdout) {
              console.log(stdout);
            }
          }).start();

    }

  });  // FIn socket io supprimier







  socket.on('sauvegarder', function(data) {

    if (data == "asterisk") {
      console.log("Sauvegarde Asterisk demandé.");
      var ssh = new SSH({
        host: ip_nas,
        user: 'root', //Super la securité
        pass: 'root' //Super la securité
      });

      ssh.exec('/sharedfolders/.backups/asterisk/sauvegarde.sh', {
        out: function(stdout) {
          console.log(stdout);
        }
      }).start();
    } else if (data == "dhcp") {

      console.log("Sauvegarde DHCP demandé.");
      var ssh = new SSH({
        host: ip_nas,
        user: 'root', //Super la securité
        pass: 'root' //Super la securité
      });

      ssh.exec('/sharedfolders/.backups/dhcp/sauvegarde.sh', {
        out: function(stdout) {
          console.log(stdout);
        }
      }).start();

    } else if (data = "dns") {

      console.log("Sauvegarde DNS demandé.");
      var ssh = new SSH({
        host: ip_nas,
        user: 'root', //Super la securité
        pass: 'root' //Super la securité
      });

      ssh.exec('/sharedfolders/.backups/dns/sauvegarde.sh', {
        out: function(stdout) {
          console.log(stdout);
        }
      }).start();

    } else if (data = "nas") {

      console.log("Sauvegarde NAS demandé.");
      var ssh = new SSH({
        host: ip_nas,
        user: 'root', //Super la securité
        pass: 'root' //Super la securité
      });

      ssh.exec('/sharedfolders/.backups/nas/sauvegarde.sh', {
        out: function(stdout) {
          console.log(stdout);
        }
      }).start();

    }

    else if (data = "fortigate") {

      console.log("Sauvegarde Fortigate demandé.");
      var ssh = new SSH({
        host: ip_nas,
        user: 'root', //Super la securité
        pass: 'root' //Super la securité
      });

      ssh.exec('/sharedfolders/.backups/fortigate/sauvegarde.sh', {
        out: function(stdout) {
          console.log(stdout);
        }
      }).start();

    }




  });
});





function CheckPingVwmare() {
  nslookup('vmware.solea.fr')
    .server('8.8.8.8') // default is 8.8.8.8
    .timeout(10 * 1000) // default is 3 * 1000 ms
    .end(function(err, addrs) {
      var hosts = [addrs];
      hosts.forEach(function(host) {
        ping.sys.probe(host, function(isAlive) {
          obj.google = isAlive;
        });
      });
    });
}

function CheckPingDns() {
  var hosts = ['1.1.1.1'];
  hosts.forEach(function(host) {
    ping.sys.probe(host, function(isAlive) {
      obj.google2 = isAlive;
    });
  });
}

function CheckDns() {}

setInterval(function() {
  CheckPingVwmare();
  CheckPingDns();
  CheckDns();
}, 1000);
