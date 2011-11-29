var net = require('net');

function ControlPort(prompt_) {
	var p = prompt_ || 'Node';
	
	this.prompt = '\033[1;33m'+p+'> \033[22;39m';
	this.commands = {};
}


ControlPort.prototype.start = function (port) {
	this.port = port;
	var self = this;
	net.createServer(function (socket) {
		socket.write(self.prompt);
		socket.on('data', function (data) {
			self.handler(data,socket);
		});
	}).listen(this.port);

}


ControlPort.prototype.handler = function (data,socket) { 
	var parse = data.toString().substring(0, data.length-1).split(/\s+/g);
	
	var command = parse.shift();
	
	if(parse[0] === '') parse.shift();

	if( this.commands[command] === undefined) { 
		socket.write('\n'+this.prompt);
		return;
	}
	var out = this.commands[command].apply(this, parse); 
	socket.write(out+'\n'+this.prompt); 
}


ControlPort.prototype.register = function(name, callback) {
	this.commands[name] = callback;
}

exports.ControlPort = ControlPort;
