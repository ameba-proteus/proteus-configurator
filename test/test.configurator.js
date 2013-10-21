/* global describe:true,it:tue,should:true */
var config = require('../lib/configurator');

describe('Configurator', function() {
	describe('#configure', function() {
		it('can load file from path', function() {
			config.configure('./test/config/test.json');
		});
		it('should fail if file does not exist', function() {
			try {
				config.configure('./test/config/not_exist.json');
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
		it('should merge json structure', function() {
			config.configure('./test/config/test2.json');
			config.test4.should.have.property('key1');
			config.test4.key1.should.equal('value1');
			config.test4.should.have.property('key2');
			config.test4.key2.should.equal('value2');
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
		it('can load with function', function() {
			config.configure({
				obj1: 'test1',
				obj2: 'test2'
			});
			config.configure(function() {
				this.obj2 = 'test22';
				this.obj3 = 'test3';
			});
			config.obj1.should.equal('test1');
			config.obj2.should.equal('test22');
			config.obj3.should.equal('test3');
		});
		it('erase properties after resetting', function() {
			config.reset();
			Object.keys(config).should.be.empty;
		});
	});
});
