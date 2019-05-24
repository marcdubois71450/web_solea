var SSH2 = require('simple-ssh');


var ssh = new SSH2({
    host: "192.168.100.105",
    user: "root", //Super la securité
    pass: "root" //Super la securité
});
  console.log("Sauvegarde DHCP demandé.");
  ssh.exec('sh /sharedfolders/dhcp/sauvegarde.sh', {
      out: function(stdout) {
          console.log(stdout);
      }
  }).start();
