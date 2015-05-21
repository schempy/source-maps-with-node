import { EventEmitter } from 'events';
import { install } from 'source-map-support';

class EmitStuff extends EventEmitter {
	constructor() {
		super();
		install();
	}

	tryMe() {
		this.emitt('success', 'It worked!');
	}
}

export default EmitStuff;
