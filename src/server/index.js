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
  domaine_vware: process.env.DOMAINE_NAME_VWARE,
  domaine_switch: process.env.DOMAINE_NAME_SWITCH,
  domaine_fortigate: process.env.DOMAINE_NAME_FORTIGATE
};
const port = "80"; // Port du serveur en Production








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
server.listen(8080);

io.on('connection', function(socket) {
  socket.on('restaurer', function(data) {
    save.restaurer(data);
  }); //Fin socket io restauration

  socket.on('suppr', function(data) {
    save.suppr(data);
  });  // Fin socket io suppr

  socket.on('sauvegarder', function(data) {
    save.sauvegarder(data);
  }); // Fin socket io sauvegarder

  socket.on('dns', function(data) {
    nslookup(data)
      .server(process.env.IP_DNS_SERVEUR)
      .timeout(1 * 1000)
      .end(function(err, addrs) {
          addrs = "" + addrs;
          var hosts = addrs.toString();
          if (hosts) {
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
// ---------------------------------Fabrication API------------------------------
// ------------------------------------------------------------------------------


// Demmarage des fonctions toute les X
setInterval(function() {
  CheckPingAsterisk();
  CheckPingNas();
  CheckPingDHCP();
  CheckPingCisco();
  CheckPingDNS();
  CheckPingWeb();
  CheckPingVware();
  CheckPingSwitch();
}, 1000);

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
  nslookup(process.env.DOMAINE_NAME_VWARE)
    .server(process.env.IP_DNS_SERVEUR)
    .timeout(1 * 1000)
    .end(function(err, addrs) {
      //Il y a peut etre une erreur ici, addrs sera peut etre undefined
      addrs = "" + addrs;
      var hosts = addrs.toString();
      obj.vwareIP = hosts;

      arp.getMAC(hosts, function(err, mac) {
        if (!err) {
          obj.vwareMac = mac;
        }
      });
        ping.sys.probe(hosts, function(isAlive) {
          obj.vware = isAlive;
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
