var config = require('./config');
var bo = require('bograch');
var amqpTransport = require('bograch-amqp');

bo.use(amqpTransport);

var server = bo.server('amqp', {
  name: 'session',
  amqpURL: config.get('amqpUrl')
});

var routes = require('./app/routes');
routes(server);

server.start();