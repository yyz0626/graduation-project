const model = require("../models/userModel");
const adminModel = require("../models/adminModel");
const { createToken } = require("../auth");

const crypto = require("crypto"); //引入crypto模块

module.exports = {
  // 用户登录
  async userLogin(ctx) {
    let { u_tel, u_pass } = ctx.request.body;
    // md5加密
    var md5 = crypto.createHash("md5");
    u_pass = md5.update(u_pass, "utf8").digest("hex"); //hex转化为十六进制
    let results = await model.userLogin(u_tel, u_pass);
    if (results[0] && results[0].u_status != 5) {
      await adminModel.insertLog({
        new_val: `用户：${results[0].u_name}(${results[0].u_tel})登录校园社交网`,
        log_type: "2-3",
      });
      let payload = {
        myToken: "myToken",
      };
      var token = createToken(payload);
      ctx.body = {
        userInfo: results,
        token: token,
      };
    } else if (!results[0]) {
      ctx.body = {
        message: "密码错误",
      };
    } else {
      ctx.body = {
        message: "已注销",
      };
    }
  },

  // 用户注册
  async userRegist(ctx) {
    let { u_name, u_pass, u_tel } = ctx.request.body;
    console.log(u_name, u_pass, u_tel);
    let results = await model.userRegist({
      u_name,
      u_pass,
      u_tel,
    });
    if (results.insertId) {
      ctx.body = {
        message: "注册成功",
      };
    }
  },

  // 用户电话号码重复
  async checkTelRepeat(ctx) {
    let { u_tel } = ctx.request.body;
    let results = await model.checkTelRepeat(u_tel);
    ctx.body = {
      userDetails: results,
    };
  },

  // 根据用户id获取用户信息
  async getUserInfoById(ctx) {
    let { u_id } = ctx.request.body;
    let results = await model.getUserInfoById(u_id);
    ctx.body = {
      userInfo: results,
    };
  },

  // 更新用户信息
  async updateUserInfo(ctx) {
    let {
      info_fk_uId,
      info_name,
      info_birthday,
      info_email,
      info_hobby,
      info_avatar,
      info_gender,
    } = ctx.request.body;
    let results = await model.updateUserInfo(
      info_fk_uId,
      info_name,
      info_birthday,
      info_email,
      info_hobby,
      info_avatar,
      info_gender
    );
    if (results.insertId >= 0) {
      ctx.body = {
        userInfo: results,
      };
    }
  },
};
