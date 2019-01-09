var ping = require('ping');

  var hosts = ['192.168.141.3'];
  hosts.forEach(function(host){
      ping.sys.probe(host, function(isAlive){
          if (isAlive) {
            var msg = 'host ' + host + ' is alive' ;
          } else {
            var msg =  'host ' + host + ' is dead';
          }
          console.log(msg);
      });
  });
