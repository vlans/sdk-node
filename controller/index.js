const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const matrix = require('../model/matrix/index')

exports.create = async (ctx, next) => {
    const { body } = ctx.request
    matrix.toJsCode(body)
    /* await fs.writeFile(__dirname + '/ll.js', 'function name () {}') */
    ctx.body = 'sdsadasd'
}

exports.api = async (ctx, next) => {
    const { body } = ctx.request
    ctx.body = body
}
