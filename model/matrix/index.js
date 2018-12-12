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
const corsOutside = require('../common/cors-outside')
const collection = require('../common/collection')

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
        this.corsOutsideJsCode = ''
        this.eventsTypeJsCode = ''
        this.collectionJsCode = ''
    }

    async toJsCode (matrix) {
        await this.initJsCode(matrix)
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

        this.toBaseJsCode({ api, type })
        this.toCreditJsCode(creditDomain)
        this.toErrorJsCode(error)
        this.toModeJsCode(mode)
        this.toOtherJsCode(other)
        this.toTimeJsCode(timePerformance)
        this.toPerformanceJsCode(timePerformance)
        this.toCorsOutsideJsCode()
        this.toEventsTypeJsCode()
        this.toCollectionJsCode()

        await this.createMatrixJsFile()
    }

    async createMatrixJsFile () {
        const matrixCode = `(function(w, d) {
            ${this.baseJsCode}
            ${this.collectionJsCode}
            ${this.errorJsCode}
            ${this.corsOutsideJsCode}
            ${this.eventsTypeJsCode}
            ${this.modeJsCode}
})(window, document)`
        await fs.writeFile(this.path, matrixCode)
    }

    toBaseJsCode (baseOptions) {
        this.baseJsCode = base.toJsCode(baseOptions)
    }

    toCreditJsCode (creditOptions) {
        this.creditJsCode = credit.toJsCode(creditOptions)
    }

    toErrorJsCode (errorOptions) {
        this.errorJsCode = error.toJsCode(errorOptions)
    }

    toModeJsCode (modeOptions) {
        this.modeJsCode = mode.toJsCode(modeOptions)
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

    toCorsOutsideJsCode () {
        this.corsOutsideJsCode = corsOutside()
    }

    toEventsTypeJsCode () {
        this.eventsTypeJsCode = eventsType()
    }

    toCollectionJsCode () {
        this.collectionJsCode = collection()
    }

}

const matrix = new Matrix()

module.exports = matrix
