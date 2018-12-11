const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))

class Mode {
    constructor () {
        this.path = __dirname + '/mode.js'
    }

    async toJsCode (options) {
        return await this.createModeJsFile(options)
    }

    async createModeJsFile (options) {
        const [delegate] = options.filter((n) => n === '事件委托')

        if (delegate) {
            const str = this.createDelegateFragment() + '\n'
            await fs.writeFile(this.path, str)
            return await this.promiseReadModeFile()
        }

        return ''
    }

    createDelegateFragment () {
        return `for (var i = 0; i < eventsType.length; i++) {
            d.addEventListener(eventsType[i].name, function (e) {
                var e = e || window.event;
                e.preventDefault();
                var target = e.target || e.srcElement;
                var parent = target.parentElement;
                var xhr = baseConfig.xhr;

                xhr.open(baseConfig.type, baseConfig.url, true);
                xhr.setRequestHeader("Content-type", "application/json");

                var attributes = [];
                var attributesLength = target.attributes.length;
                for (var i = 0; i < attributesLength; i++) {
                    attributes.push({
                        name: target.attributes[i].name,
                        value: target.attributes[i].value,
                        nodeType: target.attributes[i].nodeType
                    })
                }

                var childNodeList = target.childNodes.length;
                var sendData = {
                    id: target.id,
                    type: e.type,
                    name: target.localName,
                    className: target.className,
                    attributes: attributes,
                    childNodeList: childNodeList,
                    time: new Date().getTime()
                }

                var stringify = JSON.stringify(sendData);
                xhr.send(stringify);
            })
        }`
    }

    promiseReadModeFile () {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, 'utf-8', (err, data) => {
                if (err) return reject(err)
                resolve(data)
            })
        })
    }
}
    const mode = new Mode()

module.exports = mode
