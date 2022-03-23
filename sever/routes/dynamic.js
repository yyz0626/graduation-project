const router = require('koa-router')()
let controller = require('../controllers/dynamicController')
const {
  verifyToken
} = require('../auth')

router.prefix('/dynamic')

// 发布动态
router.post('/publishDynamic', verifyToken, controller.publishDynamic)

// 发表评论
router.post('/publishComment', verifyToken, controller.publishComment)

// 回复评论
router.post('/replyComment', verifyToken, controller.replyComment)

// 查询全部动态列表
router.get('/getDynamicList', controller.getDynamicList)

// 查询用户发布动态列表
router.post('/getDynamicListByUserId', controller.getDynamicListByUserId)

// 根据type类型查询全部动态列表
router.post('/getDynamicListByType', controller.getDynamicListByType)

// 根据动态id获取动态信息
router.post('/getDynamicDetailById', controller.getDynamicDetailById)

// 查询动态列表浏览次数前5
router.get('/getDynamicListByTop5', controller.getDynamicListByTop5)

// 模糊查询
router.post('/getDynamicByFuzzy', controller.getDynamicByFuzzy)

// 评论查询
router.post('/getCommentsById', controller.getCommentsById)

module.exports = router