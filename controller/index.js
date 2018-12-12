const fs = require('fs')
const path = require('path')
const matrix = require('../model/matrix/index')
const uglify = require('../uglify/index')

exports.create = async (ctx, next) => {
    const { body, header } = ctx.request
    await matrix.toJsCode(body)
    await uglify()

    const sdk = 'http://www.invlans.com/sdk.min.js'
    ctx.body = {
        data: {
            url: sdk
        }
    }
}

exports.api = async (ctx, next) => {
    const { body } = ctx.request

    const logPath = path.resolve(__dirname, '../sdk-log/log.json')

    let logArray = [];
    const log = fs.readFileSync(logPath)

    if (log) {
        logArray = JSON.parse(log)
    }
    logArray.push(body)

    const json = JSON.stringify(logArray)

    fs.appendFileSync(logPath, json)

    ctx.body = {
        data: {
            success: true
        }
    }
}
