const router = require("koa-router")();
const qiniu = require("qiniu");
let controller = require("../controllers/adminController");

const { verifyToken } = require("../auth");

router.prefix("/admin");

// 用户登录
router.post("/adminLogin", controller.adminLogin);

// 获取所有用户信息
router.post("/getAllUserInfo", controller.getAllUserInfo);

// 获取所有动态信息
router.post("/getAllDynamicInfo", controller.getAllDynamicInfo);

// 获取所有评论信息
router.post("/getAllCommentInfo", controller.getAllCommentInfo);

// 修改用户状态
router.post("/updateUserStatus", controller.updateUserStatus);

// 修改动态状态
router.post("/updateDynamicStatus", controller.updateDynamicStatus);

// // 用户电话号码重复
// router.post("/checkTelRepeat", controller.checkTelRepeat);

// // 根据用户id获取用户信息
// router.post("/getUserInfoById", verifyToken, controller.getUserInfoById);

// // 更新用户信息
// router.post("/updateUserInfo", controller.updateUserInfo);

module.exports = router;
