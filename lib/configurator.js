/**
 * Configurator provides
 * configuration module to share
 * common definitions all over the application
 */
var fs = require('fs');

function Configurator() {
	this.listenermap = {};
}

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
		json = JSON.parse(text);
	} else {
		// configure with object
		json = path;
	}

	var self = this;

	function emit(name, config) {
		// emit event
		var listeners = self.listenermap[name];
		if (listeners) {
			for (var i = 0; i < listeners.length; i++) {
				listeners[i].call(self, config);
			}
		}
	}

	// mapping configurations
	if (name) {
		this[name] = json;
		emit(name, json);
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
			emit(name, config);
		}
	}
};

/**
 * Listening configuration update
 */
Configurator.prototype.on = function on(name, callback) {
	var self = this;
	var listeners = self.listenermap[name];
	if (!listeners) {
		listeners = self.listenermap[name] = [];
	}
	if (self[name]) {
		// invoke immediately if configuration exists
		callback.call(self, self[name]);
	} else {
		// store handler to call later
		listeners.push(callback);
	}
}

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
