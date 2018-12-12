const promiseError = require('./promise')
const globalError = require('./global')
class Error {
    constructor () {
        this.promiseErrorCode = ''
        this.globalErrorCode = ''
    }

    toJsCode (options) {
        const [promise] = options.filter(n => n === 'Promise Reject')
        const [shell] = options.filter(n => n === '脚本错误')
        const [outside] = options.filter(n => n === '外部资源')

        if (promise) {
            this.toPromiseErrorCode()
        }

        if (shell || outside) {
            this.toGlobalErrorCode()
        }

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
