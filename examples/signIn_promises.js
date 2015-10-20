var AirDroid = require('../index.js'), config = require('./data/config.json');

AirDroid.signIn({
    mail : config.username,
    pwd : config.password,
    keep : 0,
    device_type : 4,
    push_token : 1
}).then(function(data) {
    console.log(data);
}, function(err) {
    console.log(err);
});
