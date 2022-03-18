const db = require('../models/db')

module.exports = {
    // 用户注册
    userRegist(users) {
        return db.query("insert into users set ?", users);
    },

    // 用户登录
    userLogin(u_tel, u_pass) {
        return db.query("SELECT * from users,`users_information` where users.u_tel = ? and users.u_pass = ?", [u_tel, u_pass]);
    },

    // 用户电话号码重复
    checkTelRepeat(u_tel) {
        let dbStr = u_tel.toString()
        return db.query("select * from users where u_tel = ?", [dbStr]);
    },

    // 根据用户id获取用户信息
    getUserInfoById(u_id) {
        return db.query("SELECT * from users, `users_information` where users.u_id = `users_information`.info_fk_uId and info_fk_uId = ?", [u_id]);
    },

    // 更新用户信息
    updateUserInfo(info_fk_uId, info_name, info_birthday, info_email, info_hobby, info_avatar, info_gender) {
        return db.query("update `users_information` set info_name = ?, info_birthday = ?, info_email = ?, info_hobby = ?,info_avatar = ?,info_gender = ? where info_fk_uId = ?", [info_name, info_birthday, info_email, info_hobby, info_avatar, info_gender, info_fk_uId]);
    },
}