/**
 * Configurator provides
 * configuration module to share
 * common definitions all over the application
 */
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var minify = require('./minify.json.js');

function Configurator() {
	EventEmitter.call(this);
}

util.inherits(Configurator, EventEmitter);

/**
 * Load configuration from file and store as JSON variable.
 * This method read file synchronous.
 *
 * @param path file path
 * @param name (optional) 
 */
Configurator.prototype.configure = function configure(path, name) {

	var json;

	if (typeof path === 'string') {
		// configure with file
		var text = fs.readFileSync(path, 'utf8');
		json = JSON.parse(minify(text));
	} else {
		// configure with object
		json = path;
	}

	// mapping configurations
	if (name) {
		this[name] = json;
		this.emit(name, json);
	} else {
		for (name in json) {
			// prevent overriding functions
			var exist = this[name];
			if (exist && typeof exist === 'function') {
				continue;
			}
			// check configuration exist
			var config = json[name];
			this[name] = config;
			this.emit(name, config);
		}
	}
};

/**
 * Configurator events called immediately if config is already loaded.
 * @param name String configuration name
 * @param callback Function called when config is loaded
 */
Configurator.prototype.on = function(name, callback) {
	var conf = this[name];
	if (conf) {
		callback.call(this, conf);
	} else {
		EventEmitter.prototype.on.call(this, name, callback);
	}
};

/**
 * Reset all variables
 */
Configurator.prototype.reset = function reset() {
	var names = [];
	for (var name in this) {
		names.push(name);
	}
	for (var i = 0; i < names.length; i++) {
		delete this[names[i]];
	}
};

var configurator = new Configurator();

// export configuration
module.exports = configurator;
