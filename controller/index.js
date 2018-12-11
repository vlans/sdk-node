const { exec } = require('child_process')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const matrix = require('../model/matrix/index')

exports.create = async (ctx, next) => {
    const { body, header } = ctx.request
    await matrix.toJsCode(body)
    await promiseExecProcess()

    const sdk = header.origin + '/dist/sdk.min.js'
    ctx.body = 'sdsadasd'
}

exports.api = async (ctx, next) => {
    const { body } = ctx.request
    ctx.body = body
}

function promiseExecProcess () {
    return new Promise((resolve, reject) => {
        exec('uglifyjs ./model/matrix/matrix.js -m -o ./dist/sdk.min.js', (err, data) => {
            if (err) return reject(err)
            resolve(data)
        })
    })
}
