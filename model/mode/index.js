const listener = require('./listener')
class Mode {
    constructor () {
        this.listener = ''
    }

    toJsCode (options) {
        this.createModeJsCode(options)
        return this.listener
    }

    createModeJsCode (options) {
        const [delegate] = options.filter((n) => n === '事件代理')

        if (delegate) {
            this.listener = listener()
        }
    }
}
const mode = new Mode()

module.exports = mode
