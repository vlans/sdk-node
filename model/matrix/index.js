const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const base = require('../base/index')
const credit = require('../credit/index')
const error = require('../error/index')
const mode = require('../mode/index')
const other = require('../other/index')
const eventsType = require('../events/type')
const time = require('../time/index')
const performance = require('../performance/index')

class Matrix {
    constructor () {
        this.path = __dirname + '/matrix.js'
        this.baseJsCode = ''
        this.creditJsCode = ''
        this.errorJsCode = ''
        this.modeJsCode = ''
        this.otherJsCode = ''
        this.timeJsCode = ''
        this.performanceJsCode = ''
    }

    toJsCode (matrix) {
        this.initJsCode(matrix)
    }

    async initJsCode(matrix) {
        const {
            api,
            type,
            error,
            mode,
            creditDomain,
            other,
            timePerformance
        } = matrix

        await this.toBaseJsCode({ api, type })
        this.toCreditJsCode(creditDomain)
        this.toErrorJsCode(error)
        await this.toModeJsCode(mode)
        this.toOtherJsCode(other)
        this.toTimeJsCode(timePerformance)
        this.toPerformanceJsCode(timePerformance)

        await this.createMatrixJsFile()
    }

    async createMatrixJsFile () {
        const matrixCode = `(function(w, d) {
${this.baseJsCode}
${eventsType}
${this.modeJsCode}
})(window, document)`
        await fs.writeFile(this.path, matrixCode)
    }

    async toBaseJsCode (baseOptions) {
        this.baseJsCode = await base.toJsCode(baseOptions)
    }

    toCreditJsCode (creditOptions) {
        this.creditJsCode = credit.toJsCode(creditOptions)
    }

    toErrorJsCode (errorOptions) {
        this.errorJsCode = error.toJsCode(errorOptions)
    }

    async toModeJsCode (modeOptions) {
        this.modeJsCode = await mode.toJsCode(modeOptions)
    }

    toOtherJsCode (otherOptions) {
        this.otherJsCode = other.toJsCode(otherOptions)
    }

    toTimeJsCode (timeOptions) {
        this.timeJsCode = time.toJsCode(timeOptions)
    }

    toPerformanceJsCode (performanceOptions) {
        this.performanceJsCode = performance.toJsCode(performanceOptions)
    }

    promiseReadMatrixFile () {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, 'uft-8', (err, data) => {
                if (err) return reject(err)
                resolve(data)
            })
        })
    }
}

const matrix = new Matrix()

module.exports = matrix
