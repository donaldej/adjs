var PouchDB = require('pouchdb'),
    _ = require('underscore');

var Store = function(client) {
	this.client = client;
	this.db = new PouchDB('data_store', {
		db : require('memdown')
	});
	this.container = {
		cookie:""
	};
};

Store.prototype.get = function get(_id) {
	var client = this.client,
	    container = this.container;
	return container[_id] || false;
};

Store.prototype.set = function set(_id, data) {
	var client = this.client,
	    container = this.container;
	container[_id] = container[_id] || null;
	container[_id] = data;
	client.emit('db:change:' + _id);
};

Store.prototype.updateAll = function set(data) {
	var client = this.client,
	    container = this.container;
	container = _.extend(container, data);
	client.emit('db:change:all', container);
};

module.exports = Store;
