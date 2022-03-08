const router = require('koa-router')()
let controller = require('../controllers/dynamicController')
const {
  verifyToken
} = require('../auth')

router.prefix('/dynamic')

// 查询全部动态列表
router.get('/getDynamicList', controller.getDynamicList)

// 根据type类型查询全部动态列表
router.post('/getDynamicListByType', controller.getDynamicListByType)

// 发布动态
router.post('/publishDynamic', controller.publishDynamic)


router.get('/comment', controller.getBlogComment)
router.get('/detail', controller.getBlogDetail)
router.post('/writeComment', verifyToken, controller.writeComment)
router.post('/delete', controller.delete)

module.exports = router