'use strict'
const Server = require('jimbo').Server

let server = new Server()

server.connection({
  channel: 'sitegate-oauth',
  url: 'amqp://guest:guest@localhost:5672',
})

server
  .register([
    {
      register: require('./models'),
      options: {
        mongoURI: 'mongodb://localhost:27017/sitegate-oauth',
      },
    },
    {
      register: require('./app/methods/destroy'),
    },
    {
      register: require('./app/methods/destroyByUserId'),
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
