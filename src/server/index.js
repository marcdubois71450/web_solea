const express = require('express');
const os = require('os');
const md5 = require('md5');
var ping = require('ping');
var nslookup = require('nslookup');
const app = express();
var arp = require('node-arp');
var save = require('./service/sauvegarde'); // Chargement du service sauvegarde dans "save"
require('dotenv').config(); // Chargement variable Environnement

var obj = {
  domaine_nas: process.env.DOMAINE_NAME_NAS,
  domaine_asterisk: process.env.DOMAINE_NAME_ASTERISK,
  domaine_dhcp: process.env.DOMAINE_NAME_DHCP,
  domaine_cisco: process.env.DOMAINE_NAME_CISCO,
  domaine_web: process.env.DOMAINE_NAME_WEB,
  domaine_dns: process.env.DOMAINE_NAME_DNS,
  domaine_vmware: process.env.DOMAINE_NAME_VMWARE,
  domaine_switch: process.env.DOMAINE_NAME_SWITCH,
  domaine_fortigate: process.env.DOMAINE_NAME_FORTIGATE
};
const port = "3000"; // Port du serveur en Production









// ------------------------------------------------------------------------------
// ---------------------------------Serveur Express------------------------------
// ------------------------------------------------------------------------------

app.use(express.static('dist'));
app.disable('x-powered-by');

// API Server Info
app.get('/api/serverinfo', (req, res) => res.send({
  OsType: os.type()
}));

// API Server Port
app.get('/api/serverport', (req, res) => res.send({
  Port: port
}));

// API Mot de Passe
app.get('/api/21232f297a57a5a743894a0e4a801fc3', (req, res) => res.send({ //Mdp: admin
  password: true
}));

// API Ping
app.route('/api/ping').get(function(req, res, next) {
  res.json(obj);
});

// Ecoute du serveur
app.listen(port, () => console.log('Le serveur est prêt !'));










// ------------------------------------------------------------------------------
// ---------------------------------Serveur Socket IO----------------------------
// ------------------------------------------------------------------------------

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var utf8 = require('utf8');
var SSHClient = require('ssh2').Client;
server.listen(8081);

io.on('connection', function(socket) {
  console.log("new connection");

socket.on('createNewServer', function(machineConfig) {
      console.log(machineConfig)
      createNewServer(machineConfig, socket);
  })

  socket.on('disconnect', function(){
      console.log('user disconnected');
    });

  socket.on('restaurer', function(data) {
    save.restaurer(data);
  }); //Fin socket io restauration

  socket.on('suppr', function(data) {
    save.suppr(data);
  });  // Fin socket io suppr

  socket.on('sauvegarder', function(data) {
    console.log(data);
    save.sauvegarder(data);
  }); // Fin socket io sauvegarder

  socket.on('dns', function(data) {
    nslookup(data)
      .server(process.env.IP_DNS_SERVEUR)
      .timeout(1 * 1000)
      .end(function(err, addrs) {
          addrs = "" + addrs;
          var hosts = addrs.toString();
          if (hosts && hosts !== "undefined") {
            console.log(hosts);
            socket.emit('dnsReponse', hosts);
          } else {
            hosts = "error";
            console.log(hosts);
            socket.emit('dnsReponse', hosts);
          }
      });
  }); // Fin socket io dns

});





// ------------------------------------------------------------------------------
// ---------------------------------Service SSHClient----------------------------
// ------------------------------------------------------------------------------

function createNewServer(machineConfig, socket) {
    var ssh2 = new SSHClient();
    let {msgId, ip, username, password} = machineConfig;
    ssh2.on('ready', function () {
        socket.emit(msgId, '\r\n***' + ip + ' SSH CONNECTION ESTABLISHED ***\r\n');
        ssh2.shell(function(err, stream) {
            if(err) {
                return socket.emit(msgId, '\r\n*** SSH SHELL ERROR: ' + err.message + ' ***\r\n');
            }
            socket.on(msgId, (data) => {
                stream.write(data);
                console.log("Reception : "+ data);
            });
            stream.on('data', function (d) {
              console.log("Emission : "+ utf8.decode(d.toString('binary')));
                socket.emit(msgId, utf8.decode(d.toString('binary')));
            }).on('close', function () {
                ssh2.end();
                console.log("test2");
            });
        })
    }).on('close', function () {
      console.log("test");
        socket.emit(msgId, '\r\n*** SSH CONNECTION CLOSED ***\r\n');
     }).on('error', function (err) {
        console.log(err);
        socket.emit(msgId, '\r\n*** SSH CONNECTION ERROR: ' + err.message + ' ***\r\n');
    }).connect({
        host: ip,
        port: 22,
        username: username,
        password: password
    });
}








// ------------------------------------------------------------------------------
// ---------------------------------Fabrication API------------------------------
// ------------------------------------------------------------------------------

//CheckPingAsterisk();

// Demmarage des fonctions toute les X
setInterval(function() {
  CheckPingAsterisk();
  CheckPingNas();
  CheckPingFortigate();
  CheckPingDHCP();
  CheckPingCisco();
  CheckPingDNS();
  CheckPingWeb();
  CheckPingVware();
  CheckPingSwitch();
}, 10000);

function CheckPingWeb() {
  nslookup(process.env.DOMAINE_NAME_WEB)
    .server(process.env.IP_DNS_SERVEUR)
    .timeout(1 * 1000)
    .end(function(err, addrs) {
      //Il y a peut etre une erreur ici, addrs sera peut etre undefined
      addrs = "" + addrs;
      var hosts = addrs.toString();
      obj.webIP = hosts;

      arp.getMAC(hosts, function(err, mac) {
        if (!err) {
          obj.webMac = mac;
        }
      });
        ping.sys.probe(hosts, function(isAlive) {
          obj.web = isAlive;
        });
    });
}

function CheckPingAsterisk() {
  nslookup(process.env.DOMAINE_NAME_ASTERISK)
    .server(process.env.IP_DNS_SERVEUR)
    .timeout(1 * 1000)
    .end(function(err, addrs) {
      //Il y a peut etre une erreur ici, addrs sera peut etre undefined
      addrs = "" + addrs;
      var hosts = addrs.toString();
      obj.asteriskIP = hosts;

      arp.getMAC(hosts, function(err, mac) {
        if (!err) {
          obj.asteriskMac = mac;
        }
      });
        ping.sys.probe(hosts, function(isAlive) {
          obj.asterisk = isAlive;
        });
    });
}

function CheckPingFortigate() {
  nslookup(process.env.DOMAINE_NAME_ASTERISK)
    .server(process.env.IP_DNS_SERVEUR)
    .timeout(1 * 1000)
    .end(function(err, addrs) {
      //Il y a peut etre une erreur ici, addrs sera peut etre undefined
      addrs = "" + addrs;
      var hosts = addrs.toString();
      obj.fortigateIP = hosts;

      arp.getMAC(hosts, function(err, mac) {
        if (!err) {
          obj.fortigateMac = mac;
        }
      });
        ping.sys.probe(hosts, function(isAlive) {
          obj.fortigate = isAlive;
        });
    });
}

function CheckPingNas() {
  nslookup(process.env.DOMAINE_NAME_NAS)
    .server(process.env.IP_DNS_SERVEUR)
    .timeout(1 * 1000)
    .end(function(err, addrs) {
      //Il y a peut etre une erreur ici, addrs sera peut etre undefined
      addrs = "" + addrs;
      var hosts = addrs.toString();
      obj.nasIP = hosts;

      arp.getMAC(hosts, function(err, mac) {
        if (!err) {
          obj.nasMac = mac;
        }
      });
        ping.sys.probe(hosts, function(isAlive) {
          obj.nas = isAlive;
        });
    });
}

function CheckPingDHCP() {
  nslookup(process.env.DOMAINE_NAME_DHCP)
    .server(process.env.IP_DNS_SERVEUR)
    .timeout(1 * 1000)
    .end(function(err, addrs) {
      //Il y a peut etre une erreur ici, addrs sera peut etre undefined
      addrs = "" + addrs;
      var hosts = addrs.toString();
      obj.dhcpIP = hosts;

      arp.getMAC(hosts, function(err, mac) {
        if (!err) {
          obj.dhcpMac = mac;
        }
      });
        ping.sys.probe(hosts, function(isAlive) {
          obj.dhcp = isAlive;
        });
    });
}

function CheckPingCisco() {
  nslookup(process.env.DOMAINE_NAME_CISCO)
    .server(process.env.IP_DNS_SERVEUR)
    .timeout(1 * 1000)
    .end(function(err, addrs) {
      //Il y a peut etre une erreur ici, addrs sera peut etre undefined
      addrs = "" + addrs;
      var hosts = addrs.toString();
      obj.ciscoIP = hosts;

      arp.getMAC(hosts, function(err, mac) {
        if (!err) {
          obj.ciscoMac = mac;
        }
      });
        ping.sys.probe(hosts, function(isAlive) {
          obj.cisco = isAlive;
        });
    });
}

function CheckPingDNS() {
      var hosts = process.env.IP_DNS_SERVEUR;
      obj.dnsIP = hosts;
      arp.getMAC(hosts, function(err, mac) {
        if (!err) {
          obj.dnsMac = mac;
        }
      });
        ping.sys.probe(hosts, function(isAlive) {
          obj.dns = isAlive;
      });
}

function CheckPingVware() {
  nslookup(process.env.DOMAINE_NAME_VMWARE)
    .server(process.env.IP_DNS_SERVEUR)
    .timeout(1 * 1000)
    .end(function(err, addrs) {
      //Il y a peut etre une erreur ici, addrs sera peut etre undefined
      addrs = "" + addrs;
      var hosts = addrs.toString();
      obj.vmwareIP = hosts;


      arp.getMAC(hosts, function(err, mac) {
        if (!err) {
          obj.vmwareMac = mac;
        }
      });
        ping.sys.probe(hosts, function(isAlive) {
          obj.vmware = isAlive;
        });
    });
}

function CheckPingSwitch() {
  nslookup(process.env.DOMAINE_NAME_SWITCH)
    .server(process.env.IP_DNS_SERVEUR)
    .timeout(1 * 1000)
    .end(function(err, addrs) {
      //Il y a peut etre une erreur ici, addrs sera peut etre undefined
      addrs = "" + addrs;
      var hosts = addrs.toString();
      obj.switchIP = hosts;

      arp.getMAC(hosts, function(err, mac) {
        if (!err) {
          obj.switchMac = mac;
        }
      });
        ping.sys.probe(hosts, function(isAlive) {
          obj.switch = isAlive;
        });
    });
}

function CheckPingFortigate() {
  nslookup(process.env.DOMAINE_NAME_FORTIGATE)
    .server(process.env.IP_DNS_SERVEUR)
    .timeout(1 * 1000)
    .end(function(err, addrs) {
      //Il y a peut etre une erreur ici, addrs sera peut etre undefined
      addrs = "" + addrs;
      var hosts = addrs.toString();
      obj.fortigateIP = hosts;

      arp.getMAC(hosts, function(err, mac) {
        if (!err) {
          obj.fortigateMac = mac;
        }
      });
        ping.sys.probe(hosts, function(isAlive) {
          obj.fortigate = isAlive;
        });
    });
}
