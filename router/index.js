const Router = require('koa-router')
const clientCtrl = require('../controller/index')

const router = new Router()

router.post('/ump', clientCtrl.create)
router.post('/api', clientCtrl.api)

module.exports = router
