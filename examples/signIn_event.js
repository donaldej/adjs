var AirDroid = require('../index.js'), config = require('./data/config.json');

AirDroid.on('login:success', function(data) {
    console.log(data);
});

AirDroid.signIn({
    mail : config.username,
    pwd : config.password,
    keep : 0,
    device_type : 4,
    push_token : 1
}); 