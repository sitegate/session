'use strict'
const config = require('./config')
const Server = require('jimbo').Server

let server = new Server()

server.connection({
  channel: 'sitegate-session',
  url: config.get('amqpURI'),
})

server
  .register([
    {
      register: require('./models'),
      options: {
        mongoURI: config.get('mongodbURI'),
      },
    },
    {
      register: require('./app/methods/destroy'),
    },
    {
      register: require('./app/methods/destroy-by-user-id'),
    },
    {
      register: require('./app/methods/get'),
    },
    {
      register: require('./app/methods/set'),
    },
  ])
  .then(() => server.start())
  .then(() => console.log('session server started'))
  .catch(err => {throw err})
