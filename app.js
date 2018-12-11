const Koa = require('koa')
const json = require('koa-json')
const router = require('koa-router')
const parser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')


const clientRouter = require('./router/index')
const app = new Koa()

app.use(cors())
app.use(logger())
app.use(json())
app.use(parser())

app.use(clientRouter.routes())
app.use(clientRouter.allowedMethods())

app.listen(9090)
