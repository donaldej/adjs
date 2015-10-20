var CryptoJS = require('crypto-js');
module.exports = {
	_desKey : "",
	setDesKey : function(str) {
		return this._desKey = CryptoJS.enc.Utf8.parse(str);
	},
	encrypt : function(data) {
		var dk = this._desKey,
		    encrypted = CryptoJS.DES.encrypt(data, dk, {
			mode : CryptoJS.mode.ECB,
			padding : CryptoJS.pad.Pkcs7
		});
		return encrypted.ciphertext.toString(CryptoJS.enc.Hex).toUpperCase();
	},
	decrypt : function(data) {
		var dk = this._desKey,
		    decrypted = CryptoJS.DES.decrypt({
			ciphertext : CryptoJS.enc.Hex.parse(data)
		}, dk, {
			mode : CryptoJS.mode.ECB,
			padding : CryptoJS.pad.Pkcs7
		});
		return decrypted.toString(CryptoJS.enc.Utf8);
	},
	hex_md5 : function(string){
	    return CryptoJS.MD5(string).toString();
	}
};
