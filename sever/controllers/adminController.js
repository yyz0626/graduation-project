const model = require("../models/adminModel");

// console.log(ctx.request.body);

module.exports = {
  // 获取所有用户信息
  async getAllUserInfo(ctx) {
    let { pageNo, pageSize, u_tel } = ctx.request.body;
    console.log(pageNo, pageSize, u_tel);
    let results = await model.getAllUserInfo(pageNo, pageSize, u_tel);
    let length = await model.getAllUserInfoLength(u_tel);
    ctx.body = {
      userInfoList: results,
      length: length.length,
      pageNo: pageNo,
    };
  },

  // 获取所有动态信息
  async getAllDynamicInfo(ctx) {
    let { pageNo, pageSize, u_tel, d_title, d_type } = ctx.request.body;
    let results = await model.getAllDynamicInfo(
      pageNo,
      pageSize,
      u_tel,
      d_title,
      d_type
    );
    let length = await model.getAllDynamicInfoLength();
    ctx.body = {
      userInfoList: results,
      length: length.length,
      pageNo: pageNo,
    };
  },
};
