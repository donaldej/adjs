var AirDroid = require('../index.js'), config = require('./data/config.json');

AirDroid.signIn({
    mail : config.username,
    pwd : config.password,
    keep : 0,
    device_type : 4,
    push_token : 1
}, function(err, data) {
    if (err) {
        err.print('ERROR:');
        process.exit();
    }
    console.log(data);
});
