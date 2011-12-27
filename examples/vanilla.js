var ControlPort = require('../ControlPort.js').ControlPort;

var control = new ControlPort();

control.start(6000); 

control.register('add', function (a,b) {
    return (a+b);
},'Adds two numbers');

control.register('shutdown', function () {
    process.exit(0);
},'Shuts down process');


