const router = require('koa-router')()
let controller = require('../controllers/userController')


const {
  createToken
} = require('../auth')

router.prefix('/user')

// 用户注册
router.post('/userRegist', controller.userRegist)

// 用户名重复
router.post('/checkUserNameRepeat', controller.checkUserNameRepeat)

// 用户登录
router.post('/userLogin', controller.userLogin)







//测试接口
router.get('/getUserId', controller.getUserId)


module.exports = router