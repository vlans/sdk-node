const xhr = require('./xhr')
class Base {
    constructor () {
        this.xhr = ''
    }

    toJsCode (options) {
        this.createBaseJsCode(options)
        return this.xhr
    }

    createBaseJsCode (options) {
        const { api } = options

        const baseConfig = {
            url: api.protocol + api.address,
        }
        this.xhr = xhr(baseConfig)
    }
}

const base = new Base()

module.exports = base
