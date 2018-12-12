const { exec } = require('child_process')
const Promise = require('bluebird')
const path = require('path')
const fs = Promise.promisifyAll(require('fs'))

const uglifyPath = path.resolve(__dirname, '../dist')
const matrixPath = path.resolve(__dirname, '../model/matrix/')

function promiseExecProcess () {
    try {
        const isDirectory = fs.statSync(path.resolve(__dirname, '../dist')).isDirectory()
        if (!isDirectory) {
            fs.mkdirSync(uglifyPath)
        }
    } catch (e) {
        fs.mkdirSync(uglifyPath)
    }
    return new Promise((resolve, reject) => {
        exec(`uglifyjs ${matrixPath}/matrix.js -m -o ${uglifyPath}/sdk.min.js`, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        })
    })
}

module.exports = promiseExecProcess
