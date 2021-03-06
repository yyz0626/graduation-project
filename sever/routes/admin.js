const router = require("koa-router")();
let controller = require("../controllers/adminController");

const { verifyToken } = require("../auth");

router.prefix("/admin");

// 管理端首页获取信息
router.get("/getIndexInfo", verifyToken, controller.getIndexInfo);

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

// 获取所有问题信息
router.post("/getAllProblemInfo", verifyToken, controller.getAllProblemInfo);

// 获取所有日志信息
router.post("/getAllLogInfo", verifyToken, controller.getAllLogInfo);

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

// 修改问题状态
router.post(
  "/updateProblemStatus",
  verifyToken,
  controller.updateProblemStatus
);

// 删除回复（修改回复列表）
router.post("/deleteReplyById", verifyToken, controller.deleteReplyById);

// 日志
router.post("/insertLog", verifyToken, controller.insertLog);

module.exports = router;
