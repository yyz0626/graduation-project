const model = require("../models/adminModel");
const { createToken } = require("../auth");

module.exports = {
  // 管理员登录
  async adminLogin(ctx) {
    let { admin_tel, admin_pass } = ctx.request.body;
    let results = await model.adminLogin(admin_tel, admin_pass);
    if (results.length > 0) {
      let payload = {
        admin_token: "admin_token",
      };
      var admin_token = createToken(payload);
      ctx.body = {
        admin_info: results,
        admin_token: admin_token,
      };
    } else {
      ctx.body = {
        admin_info: results,
      };
    }
  },

  // 管理员注册
  async adminRegist(ctx) {
    let { admin_name, admin_pass, admin_tel, admin_type } = ctx.request.body;
    let results = await model.adminRegist({
      admin_name,
      admin_pass,
      admin_tel,
      admin_type,
    });
    if (results.insertId) {
      ctx.body = {
        message: "注册成功",
      };
    }
  },

  // 获取所有用户信息
  async getAllUserInfo(ctx) {
    let { pageNo, pageSize, u_tel, u_status, u_name } = ctx.request.body;
    let results = await model.getAllUserInfo(
      pageNo,
      pageSize,
      u_tel,
      u_status,
      u_name
    );
    let length = await model.getAllUserInfoLength(u_tel, u_status, u_name);
    ctx.body = {
      userInfoList: results,
      length: length.length,
      pageNo: pageNo,
    };
  },

  // 获取所有动态信息
  async getAllDynamicInfo(ctx) {
    let {
      pageNo,
      pageSize,
      u_tel,
      d_title,
      d_type,
      sort_type,
      d_status,
      d_id,
    } = ctx.request.body;
    let results = await model.getAllDynamicInfo(
      pageNo,
      pageSize,
      u_tel,
      d_title,
      d_type,
      sort_type,
      d_status,
      d_id
    );
    let length = await model.getAllDynamicInfoLength(
      u_tel,
      d_title,
      d_type,
      d_status,
      d_id
    );
    ctx.body = {
      userInfoList: results,
      length: length.length,
      pageNo: pageNo,
    };
  },

  // 获取所有评论信息
  async getAllCommentInfo(ctx) {
    let { pageNo, pageSize, c_content, c_status, info_name, d_id, d_title } =
      ctx.request.body;
    let results = await model.getAllCommentInfo(
      pageNo,
      pageSize,
      c_content,
      c_status,
      info_name,
      d_id,
      d_title
    );
    let length = await model.getAllCommentInfoLength(
      c_content,
      c_status,
      info_name,
      d_id,
      d_title
    );
    ctx.body = {
      commentInfoList: results,
      length: length.length,
      pageNo: pageNo,
    };
  },

  // 获取所有管理员信息
  async getAllAdminInfo(ctx) {
    let { pageNo, pageSize, admin_tel, admin_type, admin_name } =
      ctx.request.body;
    let results = await model.getAllAdminInfo(
      pageNo,
      pageSize,
      admin_tel,
      admin_type,
      admin_name
    );
    let length = await model.getAllAdminInfoLength(
      admin_tel,
      admin_type,
      admin_name
    );
    ctx.body = {
      adminInfoList: results,
      length: length.length,
      pageNo: pageNo,
    };
  },

  // 获取所有问题信息
  async getAllProblemInfo(ctx) {
    let { pageNo, pageSize, status, help_fk_adminName } = ctx.request.body;
    let results = await model.getAllProblemInfo(
      pageNo,
      pageSize,
      status,
      help_fk_adminName
    );
    let length = await model.getAllProblemInfoLength(status, help_fk_adminName);
    ctx.body = {
      adminInfoList: results,
      length: length.length,
      pageNo: pageNo,
    };
  },

  // 修改用户状态
  async updateUserStatus(ctx) {
    let { u_status, u_id, u_fk_adminId, u_fk_adminName } = ctx.request.body;
    let results = await model.updateUserStatus(
      u_status,
      u_id,
      u_fk_adminId,
      u_fk_adminName
    );
    if (results.insertId >= 0) {
      ctx.body = {
        results: results,
      };
    }
  },

  // 修改动态状态
  async updateDynamicStatus(ctx) {
    let { d_status, d_id, d_fk_adminId, d_fk_adminName } = ctx.request.body;
    let results = await model.updateDynamicStatus(
      d_status,
      d_id,
      d_fk_adminId,
      d_fk_adminName
    );
    if (results.insertId >= 0) {
      ctx.body = {
        results: results,
      };
    }
  },

  // 修改评论状态
  async updateCommentStatus(ctx) {
    let { c_status, c_id, new_val, log_type } = ctx.request.body;
    let results = await model.updateCommentStatus(c_status, c_id);
    await model.insertLog({ new_val, log_type });
    if (results.insertId >= 0) {
      ctx.body = {
        results: results,
      };
    }
  },

  // 修改管理员状态
  async updateAdminStatus(ctx) {
    let { admin_type, admin_id } = ctx.request.body;
    let results = await model.updateAdminStatus(admin_type, admin_id);
    if (results.insertId >= 0) {
      ctx.body = {
        results: results,
      };
    }
  },

  // 修改问题状态
  async updateProblemStatus(ctx) {
    let { status, remarks, help_id, help_fk_adminName, help_fk_adminTel } =
      ctx.request.body;
    let results = await model.updateProblemStatus(
      status,
      remarks,
      help_id,
      help_fk_adminName,
      help_fk_adminTel
    );
    if (results.insertId >= 0) {
      ctx.body = {
        results: results,
      };
    }
  },

  // 删除回复（修改回复列表）
  async deleteReplyById(ctx) {
    let { reply_list, reply_id, new_val, log_type } = ctx.request.body;
    let results = await model.deleteReplyById(reply_list, reply_id);
    await model.insertLog({ new_val, log_type });
    if (results.insertId >= 0) {
      ctx.body = {
        results: results,
      };
    }
  },
};
