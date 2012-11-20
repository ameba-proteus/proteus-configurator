
var config = require('../lib/configurator');

describe('Configurator', function() {
	describe('#configure', function() {
		it('can load file from path', function() {
			config.configure('./test/config/test.json');
		});
		it('should fail if file does not exist', function() {
			var error = null;
			try {
				configurator.configure('./test/config/not_exist.json');
			} catch(e) {
				return;
			}
			should.fail('exception was not occured');
		});
		it('should refer configs', function() {
			config.configure('./test/config/test.json');
			config.should.have.property('test1');
			config.test1.should.equal('value1');
			config.should.have.property('test2');
			config.test2.should.equal('value2');
			config.should.have.property('test3');
			config.test3.should.equal('value3');
			config.should.not.have.property('test4');
		});
		it('should emit after load', function(done) {
			config.on('test1', function() {
				config.on('test4', function() {
					done();
				});
				config.configure('./test/config/test2.json');
			});
		});
		it('should load json structure', function() {
			config.test4.should.have.property('key1');
			config.test4.key1.should.equal('value1');
			config.test4.should.have.property('key2');
			config.test4.key2.should.equal('value2');
		});
		it('should emit immediately if config exists', function(done) {
			config.on('test1', function() {
				config.on('test2', function() {
					config.on('test3', function() {
						config.on('test4', function() {
							done();
						});
					});
				});
			});
		});
		it('can load object', function() {
			config.configure({
				obj1: 'test1',
				obj2: {
					key1: 'obj2key1',
					key2: 'obj2key2'
				}
			});
			config.obj1.should.equal('test1');
			config.obj2.should.have.property('key1');
			config.obj2.should.have.property('key2');
			config.obj2.key1.should.equal('obj2key1');
			config.obj2.key2.should.equal('obj2key2');
		});
	});
});
