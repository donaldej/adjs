var AirDroid = require('../index.js'),
    config = require('./data/config.json');

AirDroid.on('db:change:something', function(data) {
	console.log(data);
});

AirDroid.on('login:success', function(data) {
	this.getUserInfo(data).then(function(data) {
		console.log(data);
	}, function(reason) {
		reason.print();
	});
});

AirDroid.on('login:error', function(reason) {
	reason.print('ERROR:');
});

AirDroid.signIn({
	mail : config.username,
	pwd : config.password,
	keep : 0,
	device_type : 4,
	push_token : 1
});
