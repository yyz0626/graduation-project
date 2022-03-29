const db = require("./db");

module.exports = {
  // 用户注册
  userRegist(users) {
    return db.query("insert into users set ?", users);
  },

  // 用户登录
  userLogin(u_tel, u_pass) {
    return db.query(
      "SELECT * from users,`users_information` where users.u_tel = ? and users.u_pass = ? and users.u_id =users_information.info_fk_uId ",
      [u_tel, u_pass]
    );
  },

  // 获取所有用户信息
  getAllUserInfo(pageNo, pageSize, u_tel) {
    let dbStr = `select users.u_id,users.u_name,users.u_tel,users.create_time,users.status, users_information.info_email,users_information.info_hobby,users_information.info_avatar,users_information.info_gender,users_information.info_birthday from users,users_information where users.u_id=users_information.info_fk_uId and users.u_tel like ${
      u_tel ? `'%${u_tel}%'` : "'%'"
    } ORDER BY create_time ASC limit ${(pageNo - 1) * pageSize},${pageSize};`;
    return db.query(dbStr);
  },

  // 获取所有用户信息长度
  getAllUserInfoLength(u_tel) {
    let dbStr = `select users.u_id,users.u_name,users.u_tel,users.create_time,users.status, users_information.info_email,users_information.info_hobby,users_information.info_avatar,users_information.info_gender,users_information.info_birthday from users,users_information where users.u_id=users_information.info_fk_uId and users.u_tel like ${
      u_tel ? `'%${u_tel}%'` : "'%'"
    } ORDER BY create_time ASC`;
    return db.query(dbStr);
  },

  // 根据用户id获取用户信息
  getAllDynamicInfo(pageNo, pageSize, u_tel, d_title, d_type) {
    console.log(pageNo, pageSize, u_tel, d_title, d_type);
    let dbStr = ``;
    return db.query(dbStr);
  },

  // 更新用户信息
  updateUserInfo(
    info_fk_uId,
    info_name,
    info_birthday,
    info_email,
    info_hobby,
    info_avatar,
    info_gender
  ) {
    return db.query(
      "update `users_information` set info_name = ?, info_birthday = ?, info_email = ?, info_hobby = ?,info_avatar = ?,info_gender = ? where info_fk_uId = ?",
      [
        info_name,
        info_birthday,
        info_email,
        info_hobby,
        info_avatar,
        info_gender,
        info_fk_uId,
      ]
    );
  },
};
