const router = require('koa-router')()
let controller = require('../controllers/userController')


const {
  createToken
} = require('../auth')

router.prefix('/user')

router.post('/login', controller.login)

router.post('/regist', controller.regist)
//测试接口
router.get('/getUserId', controller.getUserId)


module.exports = router