'use strict';
//@formatter:off
var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    Crypto = require('./Crypto'),
    Q = require('q'),
    Fail = require('./Fail'),
    R = require('request'),
    Store = require('./Store');
//@formatter:on

var code = {
	success : "1",
	error : "-2"
};

function Client() {
	EventEmitter.call(this);
	this.Q = Q;
	this.Crypto = Crypto;
	this.cookie = "";
	this.Store = new Store(this);
	this.store = {

	};
}

util.inherits(Client, EventEmitter);

/* GENERAL REQUEST METHOD
 * Stores Cookie Data if successful
 */
Client.prototype.request = function request(url, method, data) {
	var client = this;
	var deferred = Q.defer(),
	    qs = null,
	    form = null,
	    options = {
		url : url || "",
		method : method || "GET",
		headers : {
			'Origin' : 'http://web.airdroid.com',
			'User-Agent' : "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36",
			'Referer' : "http://web.airdroid.com/",
			'Cookie' : client.Store.get('cookie')
		}
	};

	data = data || {};

	if (method === "GET") {
		options.qs = qs = data;
		options.qs.callback = "_jqjsp";
	} else {
		options.form = form = data;
		options.headers['Content-Type'] = "application/x-www-form-urlencoded";
	}

	R(options, function(err, resp, body) {
		var error = new Fail();
		if (!err) {
			try {
				if (method === 'GET')
					body = eval(body);
				else
					body = JSON.parse(body);
			} catch(e) {
				error.msg += body;
				if (resp.statusCode === 404)
					error.title += "Page Not Found";
				else
					error.title += "Generic - Non JSON/P";

				error.code = +resp.statusCode;
				deferred.reject(error);
			}

			if ((body.code && body.code === code.success) || (!body.code && resp.statusCode === 200)) {
				if (resp.headers['set-cookie']) {
					client.parseCookie(resp.headers['set-cookie']);
				}
				if (body.result)
					client.Store.updateAll(body.result);
				else
					client.Store.updateAll(body);
				deferred.resolve(body);
			} else {
				error.title = body.msg;
				error.code = body.code;
				deferred.reject(error);
			}
		} else {
			error.code += err.code || 'N/A';
			error.title += "Something went wrong";
			error.msg += "Check your info";
			if (err.code === 'ENOTFOUND') {
				error.title += " - Name Not Resolved";
				error.msg += "\nDomain Name Could Not Be Resolved By Name Servers.";
			}
			deferred.reject(error);
		}
	});

	return deferred.promise;
};

Client.prototype.get = function get(url, data, callback) {
	return this.request.call(this, url, 'GET', data, callback);
};

Client.prototype.post = function post(url, data, callback) {
	return this.request.call(this, url, 'POST', data, callback);
};

Client.prototype.getStore = function getStore(name) {
	if (!name)
		return this.store;
	return this.store[name];
};

Client.prototype.setStore = function setStore(name, value) {
	this.store[name] = value;
};

Client.prototype.updateStore = function updateStore(value) {
	for (var key in value) {
		this.store[key] = value[key];
	}
};

Client.prototype.parseCookie = function parseCookie(cookies) {
	var client = this;
	client.Store.set('cookie', cookies.join(';'));
	if ( typeof cookies === 'object') {
		for (var i1 = 0; i1 < cookies.length; i1++) {
			var split = cookies[i1].split('; ');
			for (var i2 = 0; i2 < split.length; i2++) {
				var split2 = split[i2].split('=');
				client.Store.set(split2[0], split2[1]);
			}
		}
	} else if ( typeof cookies === 'string') {
		var split = cookies[i1].split('; ');
		for (var i2 = 0; i2 < split.length; i2++) {
			var split2 = split[i2].split('=');
			client.Store.set(split2[0], split2[1]);
		}
	}
};

module.exports = Client;

//Utilities
function _jqjsp(json) {
	return json;
}
