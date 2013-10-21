/**
 * Configurator provides
 * configuration module to share
 * common definitions all over the application
 */
var fs = require('fs');
var minify = require('./minify.json.js');

function Configurator() {
}

/**
 * Load configuration from file and store as JSON variable.
 * This method read file synchronous.
 *
 * @param path file path or JSON
 */
Configurator.prototype.configure = function configure(path) {

	var json;

	if (typeof path === 'string') {
		// configure with file
		var text = fs.readFileSync(path, 'utf8');
		// minify to remove comments
		json = JSON.parse(minify(text));
	} else if (typeof path === 'function') {
		path.call(this);
		return;
	} else {
		// configure with object
		json = path;
	}

	// mapping configurations
	for (var name in json) {
		this[name] = json[name];
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
