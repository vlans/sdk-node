const promiseError = require('./promise')
const globalError = require('./global')
class Error {
    constructor () {
        this.promiseErrorCode = ''
        this.globalErrorCode = ''
    }

    toJsCode () {
        this.toPromiseErrorCode()
        this.toGlobalErrorCode()

        return `
            ${this.globalErrorCode}
            ${this.promiseErrorCode}
        `
    }

    toPromiseErrorCode () {
        this.promiseErrorCode = promiseError()
    }

    toGlobalErrorCode () {
        this.globalErrorCode = globalError()
    }
}

const error = new Error()

module.exports = error
