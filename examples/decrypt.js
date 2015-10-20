var AirDroid = new require('../index.js');
var fs = require('fs');

AirDroid.Crypto.setDesKey(fs.readFileSync('data/key', 'utf-8'));

var encrypted = fs.readFileSync('data/encrypted', 'utf-8');

var decrypted = fs.readFileSync('data/decrypted', 'utf-8');

if (decrypted === AirDroid.Crypto.decrypt(encrypted))
	console.log("Matches");
else
	console.log('No Match');

