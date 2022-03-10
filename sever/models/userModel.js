const db = require('../models/db')

module.exports = {
    // 用户注册
    userRegist(user) {
        return db.query("insert into user set ?", user);
    },

    // 用户名重复
    checkUserNameRepeat(u_name) {
        let a = u_name.toString()
        return db.query("select * from user where u_name = ?", [a]);
    },

    // 用户登录
    userLogin(u_phone, u_pass) {
        return db.query("select * from user where u_phone = ? and u_pass = ?", [u_phone, u_pass]);
    },




    getBlogs() {
        // return db.query("select * from t_blog order by blog_time desc,blog_id desc");
        return db.query("select *,CHAR_LENGTH(blog_content) from t_blog order BY blog_time DESC,blog_id desc");
    },

    saveUser(user) {
        return db.query("insert into t_user set ?", user);
    },
    getUserByUsername(username) {
        return db.query("select * from t_user where username=?", [username]);
    },
    getUserId() {
        return db.query("select * from admin");
    }
}