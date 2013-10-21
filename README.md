proteus-configurator
==============================

Proteus Configurator は、アプリケーションで適用される設定情報を一元管理します。
Proteus Configurator を利用するライブラリは、設定情報の適用をトリガーとして
設定処理を行うことができ、ライブラリ利用者の設定のタイミングの自由を与えることができます。

# Usage

Configuratorは、アプリケーションスコープの設定ファイルを管理するための設定ユーティリティです。
読み込んだ設定情報は、1つの設定オブジェクトにマージされます。

## 設定の読込

```js
var config = require('proteus-configurator');
config.configure('conf/test.json');
console.log(config.key1);
```

```js
var config = require('proteus-configurator');
config.configure({
});

## 指定のキー配下への設定の読込

```js
config.configure('config/test.json', 'dest');
console.log(config.dest);
```

## 設定ファイルの読込イベントを取得

```js
config.on('key1', function(vars) {
	console.log(vars);
});
config.configure('config/test.json', 'key1');
```

# License

Copyright 2012 CyberAgent, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

