var client = require('scp2')
var ls = require('ls');

var date = Date.now();

client.scp({
    host: '192.168.141.232',
    username: 'root',
    password: 'root',
    path: '/root/test'
}, './save/'+date+'.sip.conf', function(err) {})


for (var file of ls('./save/*')) {
  console.log(file.name.substr(0, 13));
}
