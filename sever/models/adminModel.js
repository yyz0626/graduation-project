const db = require("./db");

module.exports = {
  // 用户注册
  userRegist(users) {
    return db.query("insert into users set ?", users);
  },

  // 管理员登录
  adminLogin(admin_tel, admin_pass) {
    return db.query(
      "SELECT * from admin where admin.admin_tel = ? and admin.admin_pass = ?",
      [admin_tel, admin_pass]
    );
  },

  // 获取所有用户信息
  getAllUserInfo(pageNo, pageSize, u_tel, u_status) {
    let dbStr = `select users.u_id,users.u_name,users.u_tel,users.create_time,users.u_status, users_information.info_email,users_information.info_hobby,users_information.info_avatar,users_information.info_gender,users_information.info_birthday from users,users_information where users.u_id=users_information.info_fk_uId and users.u_tel like ${
      u_tel ? `'%${u_tel}%'` : "'%'"
    }  and users.u_status like ${
      u_status == 0 ? `'%'` : `${u_status}`
    }  ORDER BY create_time ASC limit ${(pageNo - 1) * pageSize},${pageSize};`;
    return db.query(dbStr);
  },

  // 获取所有用户信息长度
  getAllUserInfoLength(u_tel, u_status) {
    let dbStr = `select users.u_id,users.u_name,users.u_tel,users.create_time,users.u_status, users_information.info_email,users_information.info_hobby,users_information.info_avatar,users_information.info_gender,users_information.info_birthday from users,users_information where users.u_id=users_information.info_fk_uId and users.u_tel like ${
      u_tel ? `'%${u_tel}%'` : "'%'"
    } and users.u_status like ${
      u_status == 0 ? `'%'` : `${u_status}`
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
  updateUserStatus(u_status, u_id) {
    return db.query("update users set u_status = ? where u_id = ?", [
      u_status,
      u_id,
    ]);
  },

  // 修改动态状态
  updateDynamicStatus(d_status, d_id) {
    return db.query("update dynamic set d_status = ? where d_id = ?", [
      d_status,
      d_id,
    ]);
  },

  // 获取所有评论信息
  getAllCommentInfo(pageNo, pageSize) {
    let dbStr = `select comment.*,users_information.info_avatar,users_information.info_fk_uId,users_information.info_name,reply.reply_list,dynamic.d_title,dynamic.d_id  from comment,users_information,reply,dynamic where comment.c_fk_dId=dynamic.d_id and comment.from_uId=users_information.info_fk_uId and comment.c_id=reply.reply_fk_cId order by create_time ASC limit ${
      (pageNo - 1) * pageSize
    },${pageSize};`;
    return db.query(dbStr);
  },

  // 获取所有评论信息长度
  getAllCommentInfoLength() {
    let dbStr =
      "select comment.*,users_information.info_avatar,users_information.info_fk_uId,users_information.info_name,reply.reply_list,dynamic.d_title,dynamic.d_id from comment,users_information,reply,dynamic where `comment`.c_fk_dId=dynamic.d_id and comment.from_uId=users_information.info_fk_uId and comment.c_id=reply.reply_fk_cId order by create_time ASC";
    return db.query(dbStr);
  },
};
