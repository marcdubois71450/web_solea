var SSH = require('simple-ssh');
var ssh = new SSH({
    host: process.env.DOMAINE_NAME_NAS,
    user: 'root', //Super la securité
    pass: 'root' //Super la securité
});

module.exports = {
    sauvegarder: function(data) {
        if (data == "asterisk") {
            console.log("Sauvegarde Asterisk demandé.");
            ssh.exec('/sharedfolders/.backups/asterisk/sauvegarde.sh', {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();
        } else if (data == "dhcp") {
            console.log("Sauvegarde DHCP demandé.");
            ssh.exec('/sharedfolders/.backups/dhcp/sauvegarde.sh', {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();
        } else if (data = "dns") {
            console.log("Sauvegarde DNS demandé.");
            ssh.exec('/sharedfolders/.backups/dns/sauvegarde.sh', {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();
        } else if (data = "nas") {
            console.log("Sauvegarde NAS demandé.");
            ssh.exec('/sharedfolders/.backups/nas/sauvegarde.sh', {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();
        } else if (data = "fortigate") {
            console.log("Sauvegarde Fortigate demandé.");
            ssh.exec('/sharedfolders/.backups/fortigate/sauvegarde.sh', {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();
        }
    },
    restaurer: function(data) {
        if (data.device == "asterisk") {
            console.log("Restauration Asterisk demandé.");
            ssh.exec('/sharedfolders/.backups/asterisk/restauration.sh ' + data.date, {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();
        } else if (data.device == "dhcp") {
            console.log("Restauration DHCP demandé.");
            ssh.exec('/sharedfolders/.backups/dhcp/restauration.sh ' + data.date, {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();

        } else if (data.device = "dns") {
            console.log("Restauration DNS demandé.");
            ssh.exec('/sharedfolders/.backups/dns/restauration.sh ' + data.date, {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();

        } else if (data.device = "nas") {
            console.log("Restauration NAS demandé.");
            ssh.exec('/sharedfolders/.backups/nas/restauration.sh ' + data.date, {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();
        } else if (data.device = "fortigate") {
            console.log("Restauration Fortigate demandé.");
            ssh.exec('/sharedfolders/.backups/fortigate/restauration.sh ' + data.date, {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();
        }
    },
    suppr: function(data) {
      console.log("Suppression de " + data.device + " demandé.");
        if (data.device == "asterisk") {
            ssh.exec('/sharedfolders/.backups/asterisk/suppression.sh ' + data.date, {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();
        } else if (data.device == "dhcp") {
            ssh.exec('/sharedfolders/.backups/dhcp/suppression.sh ' + data.date, {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();
        } else if (data.device = "dns") {
            ssh.exec('/sharedfolders/.backups/dns/suppression.sh ' + data.date, {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();
        } else if (data.device = "nas") {
            ssh.exec('/sharedfolders/.backups/nas/suppression.sh ' + data.date, {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();

        } else if (data.device = "fortigate") {
            ssh.exec('/sharedfolders/.backups/fortigate/suppression.sh ' + data.date, {
                out: function(stdout) {
                    console.log(stdout);
                }
            }).start();
        }
    }
};
