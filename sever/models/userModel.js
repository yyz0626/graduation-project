const db = require('../models/db')

module.exports = {
    getBlogs() {
        // return db.query("select * from t_blog order by blog_time desc,blog_id desc");
        return db.query("select *,CHAR_LENGTH(blog_content) from t_blog order BY blog_time DESC,blog_id desc");
    },
    getUserByNamePwd(username, password) {
        return db.query("select * from t_user where username=? and password=?", [username, password]);
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