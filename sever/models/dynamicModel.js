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

    // 根据动态id获取动态信息
    getDynamicDetailById(d_id) {
        return db.query("select * from dynamic where d_id = ?", [d_id]);
    },

    // 动态查看次数+1
    addDynamicViewNum(d_id) {
        console.log('id:', d_id);
        return db.query("update dynamic set count = count + 1 where d_id = ?", [d_id]);
    },

    // 查询动态列表浏览次数前10
    getDynamicListByTop10() {
        return db.query("SELECT * FROM dynamic ORDER BY count DESC limit 5");
    },

    // 模糊查询
    getDynamicByFuzzy(query) {
        let dbStr = `SELECT * FROM dynamic WHERE d_title like '%${query}%'`
        console.log(dbStr);
        return db.query(dbStr);
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