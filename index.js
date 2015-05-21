var EmitStuff = require('./dist/emit-stuff');
var emitStuff = new EmitStuff();

emitStuff.on('success', function(response) {
	console.log(response);
});

emitStuff.tryMe();
