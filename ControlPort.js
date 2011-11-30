var net = require('net');

function ControlPort(prompt_) {
	var p = prompt_ || 'Node';
	
	this.prompt = '\033[1;33m'+p+'> \033[22;39m';
	this.commands = {};
	this.menu = '---- Menu ----\n\n';
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
	
	this.register('menu',function() {
			return this.menu+'\n';
	});
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

ControlPort.prototype.addToMenu = function (name, args,descrip) {
	var command = '  '+name;
	for(var i = 0; i < args.length; i++) {
		command += ' <'+args[i]+'>';
	}
	command += ' - '+descrip;
	this.menu += command+'\n\n';
}

ControlPort.prototype.register = function(name, callback, descrip) {
	
	if(name === 'menu') {
		delete this.commands['menu'];
	}

	this.commands[name] = callback;
	if(descrip !== undefined) {
		this.addToMenu(name,extractArguments(callback.toString()),descrip);
	}
}

function extractArguments (string) {
	string = string.replace('function','');
	var args =	string.substring(0,string.search('{')).replace(/^\s+\(/g,'').replace(/\)\s+$/g, '').split(',');
	for(var i = 0; i < args.length; i++) {
		args[i] = args[i].replace(/^\s+/g,'').replace(/\s+$/g,'');
	}
	return args;
}


exports.ControlPort = ControlPort;
