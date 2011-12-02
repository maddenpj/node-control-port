# node-control-port
	
  A TCP based control port for node processes


## Usage

  Code:	
	var ControlPort = require('control-port').ControlPort;
	
	var control = new ControlPort();
	control.start(6000);
		
	control.register('add', function (a,b) {
		return (a+b);
	},'Adds two numbers');
	control.register('shutdown', function () {
		process.exit(0);
	},'Shuts down process');
	

  In action:
		
	$ nc localhost 6000
	Node> menu
	--- Menu ---
	
	  add <a> <b> - Adds two numbers
	  
	  shutdown - Shuts down process
	  
	Node> add 2 3
	5
	Node> shutdown
	$

## Install
  
  Install with npm
  	$ npm install control-port


## Features
* Set your own Prompt!

		var control = new ControlPort('Server4');

* Unlimited Commands!

  		control.register(name, callback, menuDescription);

* Auto Menu Generation!

  	Don't like the built in menu? Just register a new one!

* Don't like Yellow? 
	
	Change it!
		
		control.color = 'red'; //or blue, cyan, green, magenta, yellow, white, grey

* Auto argument parsing:
    
	arg1, arg2, and arg3 will be passed to command callback
	
		Node> command arg1 arg2 arg3		
