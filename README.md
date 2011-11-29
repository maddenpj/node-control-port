# node-control-port
	
  A TCP based control port for node processes


## Usage

  Code:	
		
		var control = new ControlPort();
		control.start(6000);
		
		control.register('add', function (a,b) {
			return (a+b);
		});

		control.register('shutdown', function () {
			process.exit(0);
		});
		control.register('menu') function () {
			var out = '--- Menu ---\n\tshutdown - Kills the process\n';
				out+= '\tadd <A> <B> - Adds the arguments\n';
		});
	

  In action:
		
		$ nc localhost 6000
		Node> menu
		--- Menu ---
			shutdown - Kills the process
			add <A> <B> - Adds the arguments
		Node> add 2 3
		5
		Node> shutdown
		$


## Features
  Set your own Prompt
		
		var control = new ControlPort('Server4');
		
  Auto argument parsing:
		
		arg1, arg2, and arg3 will be passed to command callback
		Node> command arg1 arg2 arg3		
