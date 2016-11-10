/* globals describe, it */
import {expect} from 'chai'
import PromiseMe from '../lib/'

describe('When I create a new Promise', () => {

  it('I should have a .then method available', () => {

    let deferred = new PromiseMe(() => {
    })

    expect(deferred.then).to.be.a('function')
  })

  it('I should be able chain the result of many thenable objects together', (done) => {

    new PromiseMe((resolve) => {

      resolve('HELLO')
    }).then((greeting) => {

      expect(greeting).to.equal('HELLO')

      return new PromiseMe((resolve) => {
        resolve(greeting + ' ASHOK')
      })
    }).then((secondGreeting) => {
      expect(secondGreeting).to.equal('HELLO ASHOK')
      done()
    })

  })

})

describe('When a promise is pending', () => {
  it('It should transition to onFulfilled if the promise is successful', (done) => {
    new PromiseMe((resolve, reject) => {

      resolve()
    })
      .then(function onSuccess () {
          done()

        },
        function onError () {
          throw new Error('Unexpected error')
        })
  })

  it('It should transition to onRejected if the promise throws an exception', (done) => {
    new PromiseMe((resolve, reject) => {

      resolve()
    })
      .then(function onSuccess () {
          throw new Error('Unexpected error')

        },
        function onError () {
          done()

        })
  })
})

describe('When a promise is fulfilled', () => {
  it('The promise must return a value', () => {
    new PromiseMe((resolve, reject) => {

      resolve('Hello value')
    })
      .then(function onSuccess (value) {
        expect(value).to.exist
      })
  })

  it('The promise must not change state after being fulfilled', () => {
    throw Error("Unimplemented")
  })
})

describe('When a promise is rejected', () => {
  it('The promise must give a reason', () => {
    throw Error("Unimplemented")
  })

  it('The promise must not change state after being fulfilled', () => {
    throw Error("Unimplemented")
  })

})