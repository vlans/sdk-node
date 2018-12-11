const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))

class Base {
    constructor () {
        this.api = ''
        this.type = ''
        this.xhr = ''
        this.path = __dirname + '/base.js'
    }

    async toJsCode (options) {
        return await this.createBaseJsFile(options)
    }

    async createBaseJsFile (options) {
        const { api, type } = options

        const baseConfig = {
            type: type[0],
            url: api.protocol + api.address,
            xhr: ''
        }

        await this.baseWriteConfig(baseConfig)

        const creationHttpRequestCode = this.creationHttpRequest().toString()
        await fs.appendFile(this.path, creationHttpRequestCode + '\n')
        return await this.promiseReadBaseFile()
    }

    async baseWriteConfig (config) {
        await fs.writeFile(this.path, `var baseConfig = ${ JSON.stringify(config) } \n`)
    }

    creationHttpRequest () {
        return `if (window.XMLHttpRequest) {
            baseConfig.xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            baseConfig.xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }`
    }

    promiseReadBaseFile () {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, 'utf-8', (err, data) => {
                if (err) return reject(err)
                resolve(data)
            })
        })
    }
}

const base = new Base()

module.exports = base
