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
    ctx.body = body
}
