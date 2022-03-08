const db = require('./db')

module.exports = {
    // 查询全部动态列表
    getDynamicList() {
        return db.query("select * from dynamic");
    },

    // 根据type类型查询全部动态列表
    getDynamicListByType(d_type) {
        return db.query("select * from dynamic where d_type = ?", [d_type]);
    },

    // 发布动态
    publishDynamic(dynamic) {
        return db.query("insert into dynamic set ?", dynamic);
    },


    // getUserByNamePwd(username, password) {
    //     return db.query("select * from t_user where username=? and password=?", [username, password]);
    // },
    // saveUser(user) {
    //     return db.query("insert into t_user set ?", user);
    // },
    // getBlogComment(blogId) {
    //     return db.query("SELECT comm_content,comm_time,nickname,comm_id FROM t_comment,t_user WHERE t_comment.blog_id=? and t_comment.user_id=t_user.user_id order BY comm_time DESC ", [blogId])
    // },
    // getBlogDetail(blogId) {
    //     return db.query("select * from t_blog where blog_id=?", [blogId]);
    // },

    // saveContent(comment) {
    //     return db.query("insert into t_comment set ?", comment);
    // },
    // deleteBlog(blogId) {
    //     console.log(blogId);
    //     return db.query("DELETE FROM t_blog WHERE blog_id=?", [blogId])
    // }
}