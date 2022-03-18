const db = require('./db')

module.exports = {
    // 查询全部动态列表
    getDynamicList() {
        return db.query("SELECT * from dynamic ORDER BY createTime DESC");
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
        return db.query("update dynamic set count = count + 1 where d_id = ?", [d_id]);
    },

    // 查询动态列表浏览次数前5
    getDynamicListByTop5() {
        return db.query("SELECT * FROM dynamic ORDER BY count DESC limit 5");
    },

    // 模糊查询
    getDynamicByFuzzy(query) {
        let dbStr = `SELECT * FROM dynamic WHERE d_title like '%${query}%'`
        return db.query(dbStr);
    },

    // 查询上一条数据
    getLastDynamic(d_id) {
        let dbStr = `select * from dynamic where createTime >(select createTime from dynamic where d_id =${d_id})order by createTime ASC limit 1`
        return db.query(dbStr);
    },

    // 查询下一条数据
    getNextDynamic(d_id) {
        let dbStr = `select * from dynamic where createTime <(select createTime from dynamic where d_id =${d_id})order by createTime DESC limit 1`
        return db.query(dbStr);
    }
}