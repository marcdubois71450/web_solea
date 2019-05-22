var SSH2 = require('simple-ssh');
require('dotenv').config(); // Chargement variable Environnement



module.exports = {
    sauvegarder: function(data) {
        if (data == "asterisk") {
          var ssh = new SSH2({
              host: process.env.DOMAINE_NAME_NAS,
              user: 'root', //Super la securité
              pass: 'root' //Super la securité
          });
            console.log("Sauvegarde Asterisk demandé.");
            ssh.exec('/sharedfolders/asterisk/sauvegarde.sh', {
                out: function(stdout) {
                    console.log("ici : "+stdout);
                }
            }).start();
        } else if (data == "dhcp") {
          var ssh = new SSH2({
              host: process.env.DOMAINE_NAME_NAS,
              user: 'root', //Super la securité
              pass: 'root' //Super la securité
          });
            console.log("Sauvegarde DHCP demandé.");
            ssh.exec('/sharedfolders/dhcp/sauvegarde.sh', {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();
        } else if (data == "dns") {
          var ssh = new SSH2({
              host: process.env.DOMAINE_NAME_NAS,
              user: 'root', //Super la securité
              pass: 'root' //Super la securité
          });
            console.log("Sauvegarde DNS demandé.");
            ssh.exec('/sharedfolders/dns/sauvegarde.sh', {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();
        } else if (data == "nas") {
          var ssh = new SSH2({
              host: process.env.DOMAINE_NAME_NAS,
              user: 'root', //Super la securité
              pass: 'root' //Super la securité
          });
            console.log("Sauvegarde NAS demandé.");
            ssh.exec('/sharedfolders/nas/sauvegarde.sh', {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();
        } else if (data == "fortigate") {
          var ssh = new SSH2({
              host: process.env.DOMAINE_NAME_NAS,
              user: 'root', //Super la securité
              pass: 'root' //Super la securité
          });
            console.log("Sauvegarde Fortigate demandé.");
            ssh.exec('/sharedfolders/fortigate/sauvegarde.sh', {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();
        } else if (data == "cisco") {
          var ssh = new SSH2({
              host: process.env.DOMAINE_NAME_NAS,
              user: 'root', //Super la securité
              pass: 'root' //Super la securité
          });
            console.log("Sauvegarde Cisco demandé.");
            ssh.exec('/sharedfolders/cisco/sauvegarde.sh', {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();
        } else if (data == "switch") {
          var ssh = new SSH2({
              host: process.env.DOMAINE_NAME_NAS,
              user: 'root', //Super la securité
              pass: 'root' //Super la securité
          });
            console.log("Sauvegarde Switch demandé.");
            ssh.exec('/sharedfolders/switch/sauvegarde.sh', {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();
        } else if (data == "vmware") {
          var ssh = new SSH2({
              host: process.env.DOMAINE_NAME_NAS,
              user: 'root', //Super la securité
              pass: 'root' //Super la securité
          });
            console.log("Sauvegarde Vmware demandé.");
            ssh.exec('/sharedfolders/esxi/sauvegarde.sh', {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();
        }
    },
    restaurer: function(data) {
      var ssh = new SSH2({
          host: process.env.DOMAINE_NAME_NAS,
          user: 'root', //Super la securité
          pass: 'root' //Super la securité
      });
        if (data.device == "asterisk") {
            console.log("Restauration Asterisk demandé.");
            ssh.exec('/sharedfolders/asterisk/restauration.sh ' + data.date, {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();
        } else if (data.device == "dhcp") {
          var ssh = new SSH2({
              host: process.env.DOMAINE_NAME_NAS,
              user: 'root', //Super la securité
              pass: 'root' //Super la securité
          });
            console.log("Restauration DHCP demandé.");
            ssh.exec('/sharedfolders/dhcp/restauration.sh ' + data.date, {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();

        } else if (data.device == "dns") {
          var ssh = new SSH2({
              host: process.env.DOMAINE_NAME_NAS,
              user: 'root', //Super la securité
              pass: 'root' //Super la securité
          });
            console.log("Restauration DNS demandé.");
            ssh.exec('/sharedfolders/dns/restauration.sh ' + data.date, {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();

        } else if (data.device == "nas") {
          var ssh = new SSH2({
              host: process.env.DOMAINE_NAME_NAS,
              user: 'root', //Super la securité
              pass: 'root' //Super la securité
          });
            console.log("Restauration NAS demandé.");
            ssh.exec('/sharedfolders/nas/restauration.sh ' + data.date, {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();
        } else if (data.device == "fortigate") {
          var ssh = new SSH2({
              host: process.env.DOMAINE_NAME_NAS,
              user: 'root', //Super la securité
              pass: 'root' //Super la securité
          });
            console.log("Restauration Fortigate demandé.");
            ssh.exec('/sharedfolders/fortigate/restauration.sh ' + data.date, {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();
        } else if (data.device == "cisco") {
          var ssh = new SSH2({
              host: process.env.DOMAINE_NAME_NAS,
              user: 'root', //Super la securité
              pass: 'root' //Super la securité
          });
            console.log("Restauration Cisco demandé.");
            ssh.exec('/sharedfolders/cisco/restauration.sh ' + data.date, {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();
        }
    },
    suppr: function(data) {
      console.log("Suppression de " + data.device + " demandé.");
        if (data.device == "asterisk") {
          var ssh = new SSH2({
              host: process.env.DOMAINE_NAME_NAS,
              user: 'root', //Super la securité
              pass: 'root' //Super la securité
          });
            ssh.exec('/sharedfolders/asterisk/suppression.sh ' + data.date, {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();
        } else if (data.device == "dhcp") {
          var ssh = new SSH2({
              host: process.env.DOMAINE_NAME_NAS,
              user: 'root', //Super la securité
              pass: 'root' //Super la securité
          });
            ssh.exec('/sharedfolders/dhcp/suppression.sh ' + data.date, {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();
        } else if (data.device == "dns") {
          var ssh = new SSH2({
              host: process.env.DOMAINE_NAME_NAS,
              user: 'root', //Super la securité
              pass: 'root' //Super la securité
          });
            ssh.exec('/sharedfolders/dns/suppression.sh ' + data.date, {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();
        } else if (data.device == "nas") {
          var ssh = new SSH2({
              host: process.env.DOMAINE_NAME_NAS,
              user: 'root', //Super la securité
              pass: 'root' //Super la securité
          });
            ssh.exec('/sharedfolders/nas/suppression.sh ' + data.date, {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();

        } else if (data.device == "fortigate") {
          var ssh = new SSH2({
              host: process.env.DOMAINE_NAME_NAS,
              user: 'root', //Super la securité
              pass: 'root' //Super la securité
          });
            ssh.exec('/sharedfolders/fortigate/suppression.sh ' + data.date, {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();
        } else if (data.device == "cisco") {
          console.log("Demande suppression sauvegarde Cisco :"+data.date);
          var ssh = new SSH2({
              host: process.env.DOMAINE_NAME_NAS,
              user: 'root', //Super la securité
              pass: 'root' //Super la securité
          });
            ssh.exec('/sharedfolders/cisco/suppression.sh ' + data.date, {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();
        }
    }
};
