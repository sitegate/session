'use strict'
const chaiAsPromised = require('chai-as-promised')
const chai = require('chai')
const expect = chai.expect
const plugiator = require('plugiator')
const jimbo = require('jimbo')
const set = require('../../app/methods/set')
const modelsPlugin = require('../../models')
const config = require('../../config')
const clearDB = require('mocha-mongoose')(config.get('mongodbURI'))

chai.use(chaiAsPromised)

describe('set', function() {
  beforeEach(clearDB)
  beforeEach(function(next) {
    this._server = new jimbo.Server()

    this._server.register([
      {
        register: modelsPlugin,
        options: {
          mongoURI: config.get('mongodbURI'),
        },
      },
    ], err => next(err))
  })

  it('should save session', function() {
    return this._server
      .register([
        {
          register: set,
        },
      ])
      .then(() => this._server.methods.set({
          sid: '123',
          session: {
            foo: 'bar',
          },
        }))
      .then(session => {
        expect(session).to.exist
        expect(session._id).to.exist
      })
  })
})
