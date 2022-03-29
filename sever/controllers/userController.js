const model = require("../models/userModel");
const { createToken } = require("../auth");

module.exports = {
  // 用户登录
  async userLogin(ctx) {
    let { u_tel, u_pass } = ctx.request.body;
    let results = await model.userLogin(u_tel, u_pass);
    if (results.length > 0) {
      let payload = {
        myToken: "myToken",
      };
      var token = createToken(payload);
      ctx.body = {
        userInfo: results,
        token: token,
      };
    } else {
      ctx.body = {
        userInfo: results,
      };
    }
    // } else {
    //     ctx.body = 'fail'
    // }
  },

  // 用户注册
  async userRegist(ctx) {
    let { u_name, u_pass, u_tel } = ctx.request.body;
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
