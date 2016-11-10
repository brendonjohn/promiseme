let possibleState = {
  waiting: 0,
  success: 1,
  failed: 2
}

let buildPromise = function (handler) {

  this.currentState = possibleState.waiting

  setTimeout(() => {
    handler(this.onResolve, this.onReject)
  }, 0)

}

buildPromise.prototype = {
  then: function (successHandler, errorHandler) {
    this.nextIfSuccess = successHandler
    this.nextIfFailure = errorHandler

    return this
  },
  onResolve: function (value) {
    this.currentState = possibleState.success

    this.nextIfSuccess(value)
  },
  onReject: function (value) {
    this.currentState = possibleState.failed
    this.nextIfFailure(value)
  }
}

export default buildPromise
