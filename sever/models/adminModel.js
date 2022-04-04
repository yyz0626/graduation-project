const db = require("./db");

module.exports = {
  // 管理员注册
  adminRegist(admin) {
    return db.query("insert into admin set ?", admin);
  },

  // 管理员登录
  adminLogin(admin_tel, admin_pass) {
    return db.query(
      "SELECT * from admin where admin.admin_tel = ? and admin.admin_pass = ?",
      [admin_tel, admin_pass]
    );
  },

  // 获取所有用户信息
  getAllUserInfo(pageNo, pageSize, u_tel, u_status, u_name) {
    let dbStr = `select users.u_id,users.u_name,users.u_tel,users.create_time,users.u_status, users_information.info_email,users_information.info_hobby,users_information.info_avatar,users_information.info_gender,users_information.info_birthday from users,users_information where users.u_id=users_information.info_fk_uId and users.u_tel like ${
      u_tel ? `'%${u_tel}%'` : "'%'"
    }  and users.u_status like ${
      u_status == 0 ? `'%'` : `${u_status}`
    } and users.u_name like ${
      u_name ? `'%${u_name}%'` : "'%'"
    } ORDER BY create_time ASC limit ${(pageNo - 1) * pageSize},${pageSize};`;
    return db.query(dbStr);
  },

  // 获取所有用户信息长度
  getAllUserInfoLength(u_tel, u_status, u_name) {
    let dbStr = `select users.u_id,users.u_name,users.u_tel,users.create_time,users.u_status, users_information.info_email,users_information.info_hobby,users_information.info_avatar,users_information.info_gender,users_information.info_birthday from users,users_information where users.u_id=users_information.info_fk_uId and users.u_tel like ${
      u_tel ? `'%${u_tel}%'` : "'%'"
    } and users.u_status like ${
      u_status == 0 ? `'%'` : `${u_status}`
    } and users.u_name like ${
      u_name ? `'%${u_name}%'` : "'%'"
    } ORDER BY create_time ASC`;
    return db.query(dbStr);
  },

  // 获取所有动态信息
  getAllDynamicInfo(
    pageNo,
    pageSize,
    u_tel,
    d_title,
    d_type,
    sort_type,
    d_status,
    d_id
  ) {
    let sort_Str = "";
    if (sort_type == 1) {
      sort_Str = "createTime";
    } else if (sort_type == 2) {
      sort_Str = "info_count";
    } else {
      sort_Str = "info_comment_count";
    }
    let dbStr = `select dynamic.*,dynamic_information.*,users.* from dynamic,dynamic_information,users WHERE dynamic.d_id=dynamic_information.info_fk_dId and dynamic.d_fk_uId = users.u_id and users.u_tel like ${
      u_tel ? `'%${u_tel}%'` : "'%'"
    } and dynamic.d_type like ${
      d_type == 0 ? `'%'` : `${d_type}`
    } and dynamic.d_title like ${
      d_title ? `'%${d_title}%'` : "'%'"
    } and dynamic.d_status like ${
      d_status == 0 ? `'%'` : `${d_status}`
    } and dynamic.d_id like ${
      d_id ? `${d_id}` : "'%'"
    } ORDER BY ${sort_Str} DESC limit ${(pageNo - 1) * pageSize},${pageSize};`;
    return db.query(dbStr);
  },

  // 获取所有动态信息长度
  getAllDynamicInfoLength(u_tel, d_title, d_type, d_status, d_id) {
    let dbStr = `select dynamic.*,dynamic_information.*,users.* from dynamic,dynamic_information,users WHERE dynamic.d_id=dynamic_information.info_fk_dId and dynamic.d_fk_uId = users.u_id and users.u_tel like ${
      u_tel ? `'%${u_tel}%'` : "'%'"
    } and dynamic.d_type like ${
      d_type == 0 ? `'%'` : `${d_type}`
    } and dynamic.d_title like ${
      d_title ? `'%${d_title}%'` : "'%'"
    } and dynamic.d_status like ${
      d_status == 0 ? `'%'` : `${d_status}`
    } and dynamic.d_id like ${
      d_id ? `${d_id}` : "'%'"
    } ORDER BY create_time ASC`;
    return db.query(dbStr);
  },

  // 修改用户状态
  updateUserStatus(u_status, u_id, u_fk_adminId, u_fk_adminName) {
    return db.query(
      "update users set u_status = ?,u_fk_adminId = ?, u_fk_adminName = ? where u_id = ?",
      [u_status, u_fk_adminId, u_fk_adminName, u_id]
    );
  },

  // 修改动态状态
  updateDynamicStatus(d_status, d_id, d_fk_adminId, d_fk_adminName) {
    return db.query(
      "update dynamic set d_status = ?,d_fk_adminId = ?, d_fk_adminName = ?  where d_id = ?",
      [d_status, d_fk_adminId, d_fk_adminName, d_id]
    );
  },

  // 修改评论状态
  updateCommentStatus(c_status, c_id) {
    return db.query("update comment set c_status = ? where c_id = ?", [
      c_status,
      c_id,
    ]);
  },

  // 修改管理员状态
  updateAdminStatus(admin_type, admin_id) {
    return db.query("update admin set admin_type = ? where admin_id = ?", [
      admin_type,
      admin_id,
    ]);
  },

  // 修改问题状态
  updateProblemStatus(
    status,
    remarks,
    help_id,
    help_fk_adminName,
    help_fk_adminTel
  ) {
    return db.query(
      "update help set status = ?, remarks = ?,help_fk_adminName = ?, help_fk_adminTel = ? where help_id = ?",
      [status, remarks, help_fk_adminName, help_fk_adminTel, help_id]
    );
  },

  // 删除回复（修改回复列表）
  deleteReplyById(reply_list, reply_id) {
    return db.query("update reply set reply_list = ? where reply_id = ?", [
      reply_list,
      reply_id,
    ]);
  },

  // 获取所有评论信息
  getAllCommentInfo(
    pageNo,
    pageSize,
    c_content,
    c_status,
    info_name,
    d_id,
    d_title
  ) {
    let dbStr = `select comment.*,users_information.info_avatar,users_information.info_fk_uId,users_information.info_name,reply.*,dynamic.d_title,dynamic.d_id from comment,users_information,reply,dynamic where comment.c_fk_dId=dynamic.d_id and comment.from_uId=users_information.info_fk_uId and comment.c_id=reply.reply_fk_cId and comment.c_status like ${c_status} and comment.c_content like ${
      c_content ? `'%${c_content}%'` : "'%'"
    }and comment.c_content like ${
      c_content ? `'%${c_content}%'` : "'%'"
    }and users_information.info_name like ${
      info_name ? `'%${info_name}%'` : "'%'"
    }and dynamic.d_id like ${
      d_id ? `'%${d_id}%'` : "'%'"
    }and dynamic.d_title like ${
      d_title ? `'%${d_title}%'` : "'%'"
    }order by create_time ASC limit ${(pageNo - 1) * pageSize},${pageSize};`;
    return db.query(dbStr);
  },

  // 获取所有评论信息长度
  getAllCommentInfoLength(c_content, c_status, info_name, d_id, d_title) {
    let dbStr = `select comment.*,users_information.info_avatar,users_information.info_fk_uId,users_information.info_name,reply.*,dynamic.d_title,dynamic.d_id from comment,users_information,reply,dynamic where comment.c_fk_dId=dynamic.d_id and comment.from_uId=users_information.info_fk_uId and comment.c_id=reply.reply_fk_cId and comment.c_status like ${c_status} and comment.c_content like ${
      c_content ? `'%${c_content}%'` : "'%'"
    }and comment.c_content like ${
      c_content ? `'%${c_content}%'` : "'%'"
    }and users_information.info_name like ${
      info_name ? `'%${info_name}%'` : "'%'"
    }and dynamic.d_id like ${
      d_id ? `'%${d_id}%'` : "'%'"
    } and dynamic.d_title like ${
      d_title ? `'%${d_title}%'` : "'%'"
    }order by create_time ASC`;
    return db.query(dbStr);
  },

  // 获取所有管理员信息
  getAllAdminInfo(pageNo, pageSize, admin_tel, admin_type, admin_name) {
    let dbStr = `select * from admin where admin_tel like ${
      admin_tel ? `'%${admin_tel}%'` : "'%'"
    }and admin_type like ${
      admin_type ? `'%${admin_type}%'` : "'%'"
    }and admin_name like ${
      admin_name ? `'%${admin_name}%'` : "'%'"
    }order by create_time ASC limit ${(pageNo - 1) * pageSize},${pageSize};`;
    return db.query(dbStr);
  },

  // 获取所有管理员信息长度
  getAllAdminInfoLength(admin_tel, admin_type, admin_name) {
    let dbStr = `select * from admin where admin_tel like ${
      admin_tel ? `'%${admin_tel}%'` : "'%'"
    }and admin_type like ${
      admin_type ? `'%${admin_type}%'` : "'%'"
    }and admin_name like ${
      admin_name ? `'%${admin_name}%'` : "'%'"
    }order by create_time ASC`;
    return db.query(dbStr);
  },

  // 获取所有问题信息
  getAllProblemInfo(pageNo, pageSize, status, help_fk_adminName) {
    let dbStr = `select * from help where help_fk_adminName like ${
      help_fk_adminName ? `'%${help_fk_adminName}%'` : "'%'"
    }and status like ${
      status ? `'%${status}%'` : "'%'"
    }order by create_time ASC limit ${(pageNo - 1) * pageSize},${pageSize};`;
    return db.query(dbStr);
  },

  // 获取所有问题信息长度
  getAllProblemInfoLength(status, help_fk_adminName) {
    let dbStr = `select * from help where help_fk_adminName like ${
      help_fk_adminName ? `'%${help_fk_adminName}%'` : "'%'"
    }and status like ${
      status ? `'%${status}%'` : "'%'"
    }order by create_time ASC`;
    return db.query(dbStr);
  },

  // 获取所有日志信息
  getAllLogInfo(pageNo, pageSize) {
    let dbStr = `select * from log order by create_time ASC limit ${
      (pageNo - 1) * pageSize
    },${pageSize};`;
    return db.query(dbStr);
  },

  // 获取所有日志信息长度
  getAllLogInfoLength() {
    let dbStr = `select * from log order by create_time ASC`;
    return db.query(dbStr);
  },

  // 日志
  insertLog(new_val) {
    return db.query("insert into log set ?", new_val);
  },

  // 所有用户
  userLength() {
    let dbStr = `select * from users`;
    return db.query(dbStr);
  },

  // 所有管理员
  adminLength() {
    let dbStr = `select * from admin`;
    return db.query(dbStr);
  },

  // 所有动态
  dynamicLength() {
    let dbStr = `select * from dynamic`;
    return db.query(dbStr);
  },

  // 24小时内发布的动态
  dynamicLengthIn24() {
    let dbStr = `select * from dynamic where createTime > DATE_SUB(NOW(),INTERVAL 24 hour)`;
    return db.query(dbStr);
  },

  // 已解决问题
  problem_handle() {
    let dbStr = `select * from help where status = 1`;
    return db.query(dbStr);
  },

  // 待解决问题
  problem_unHandle() {
    let dbStr = `select * from help where status = 2`;
    return db.query(dbStr);
  },
};
