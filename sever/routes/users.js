const router = require('koa-router')()
const qiniu = require("qiniu");
let controller = require('../controllers/userController')

const {
  verifyToken
} = require('../auth')

router.prefix('/user')

// 用户注册
router.post('/userRegist', controller.userRegist)

// 用户电话号码重复
router.post('/checkTelRepeat', controller.checkTelRepeat)

// 用户登录
router.post('/userLogin', controller.userLogin)

// 根据用户id获取用户信息
router.post('/getUserInfoById', verifyToken, controller.getUserInfoById)

// 更新用户信息
router.post('/updateUserInfo', controller.updateUserInfo)


// 七牛云token
router.get('/getQiNiuToken', async function (ctx, next) {
  const accessKey = 'GRgU9m2hYb7nC1V-pcdDvf1Z48t8rKd4QSL4nm3i' // 你的七牛的accessKey
  const secretKey = 'Gs9R6rwRU2Ybj4LBpkGrhCihlUHUNYRe4h5ymC_b' // 你的七牛的secretKey
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  const options = {
    scope: 'pic-base0626' // 你的七牛存储对象
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)
  ctx.body = {
    uploadToken
  }
})

module.exports = router