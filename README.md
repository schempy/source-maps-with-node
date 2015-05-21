Using source maps when generating ES5 code from ES6 has proved to be very helpful in my development. When debugging I want errors to reference the source files not the generated files. I use [babel](https://github.com/babel/babel) to generate ES5 code from ES6 and source-map files. I also use [source-map-support](https://github.com/evanw/node-source-map-support) for referencing stack traces in the source file.

For this example I'll create a simple ES6 class that extends EventEmitter and will emit a success event. I'll purposely misspell the word emit and check if the error references the source file.

My ES6 files will be in a directory named **lib**. The generated ES5 and source map files will be in a directory named **dist**. 

In my ES6 class I need to include the [source-map-support](https://github.com/evanw/node-source-map-support) library and call its install() in the construtor.
Here is the ES6 class:

```js
import { EventEmitter } from 'events';
import { install } from 'source-map-support';

export class EmitStuff extends EventEmitter {
	constructor() {
		super();
		install(); // Required for source-map-support
	}
	
	tryMe() {
		this.emitt('success', 'It works!');
	}
}

export default EmitStuff;
```

Here is the entry point that uses the **EmitStuff** class I created. It uses the ES5 generated file.

```js
var EmitStuff = require('./dist/emit-stuff');
var emitStuff = new EmitStuff();

emitStuff.on('success', function(response) {
	console.log(response);
});

emitStuff.tryMe();
```

Here is the build step that will generate ES5 code and source-map files into the **dist** directory from the ES6 code in the **lib** directory.

```bash
babel out-dir dist lib --source-maps
```

Now when I run my entry point file I get the following:

```bash
node index.js

/emitstuff/lib/emit-stuff.js:11
		this.emitt('success', 'It worked!');
       ^
TypeError: undefined is not a function
    at EmitStuff.tryMe (/emitstuff/lib/emit-stuff.js:11:8)
	....
```

The error points to the source file!