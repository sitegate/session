'use strict'
const chaiAsPromised = require('chai-as-promised')
const chai = require('chai')
const expect = chai.expect
const plugiator = require('plugiator')
const jimbo = require('jimbo')
const set = require('../../app/methods/set')
const get = require('../../app/methods/get')
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

  it('should upsert session', function() {
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
  })

  it('should get and save session', function() {
    let sid = '123'
    return this._server
      .register([
        {
          register: get,
        },
        {
          register: set,
        },
      ])
      .then(() => this._server.methods.set({
          sid,
          session: {
            foo: 'bar',
          },
        }))
      .then(() => this._server.methods.get({sid}))
      .then(session => {
        expect(session).to.exist

        session.newField = 'new value'
        return this._server.methods.set({
          sid,
          session,
        })
      })
      .then(() => this._server.methods.get({sid}))
      .then(session => {
        expect(session.newField).to.eq('new value')
      })
  })
})
