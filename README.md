proteus-configurator
==========

Proteus Configurator make configuring application simple.

# Feature

- Configure with File/JSON/Function.
- Merge multiple configurations.

# Usage

```js
var config = require('proteus-configurator');

// JSON parsing
config.configure('path/to/config.json');

// Pure Javascript object
config.configure({
  prop1: 'value1',
  prop2: 'value2',
  prop3: {
    name1: 'value31',
    name2: 'value32'
  }
});

// with require
config.configure('/path/to/config.js');

// with function
config.configure(function() {
  this.prop1 = 'value1';
  this.prop2 = {
    name1: 'value21',
    name2: 'value22'
  };
});
```

```js
var config = require('proteus-configuretor');
config.configure(...);

console.log(config.prop1);
console.log(config.prop2);
```

# License

The MIT License (MIT)

Copyright (c) 2013 CyberAgent, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

