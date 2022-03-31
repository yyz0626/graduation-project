const router = require("koa-router")();
let controller = require("../controllers/adminController");

const { verifyToken } = require("../auth");

router.prefix("/admin");

// 管理员登录
router.post("/adminLogin", controller.adminLogin);

// 管理员注册
router.post("/adminRegist", verifyToken, controller.adminRegist);

// 获取所有用户信息
router.post("/getAllUserInfo", verifyToken, controller.getAllUserInfo);

// 获取所有动态信息
router.post("/getAllDynamicInfo", verifyToken, controller.getAllDynamicInfo);

// 获取所有评论信息
router.post("/getAllCommentInfo", verifyToken, controller.getAllCommentInfo);

// 获取所有管理员信息
router.post("/getAllAdminInfo", verifyToken, controller.getAllAdminInfo);

// 修改用户状态
router.post("/updateUserStatus", verifyToken, controller.updateUserStatus);

// 修改动态状态
router.post(
  "/updateDynamicStatus",
  verifyToken,
  controller.updateDynamicStatus
);

// 修改评论状态
router.post(
  "/updateCommentStatus",
  verifyToken,
  controller.updateCommentStatus
);

// 修改管理员状态
router.post("/updateAdminStatus", verifyToken, controller.updateAdminStatus);

// 删除回复（修改回复列表）
router.post("/deleteReplyById", verifyToken, controller.deleteReplyById);

module.exports = router;
