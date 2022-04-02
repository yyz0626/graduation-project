const db = require("./db");

module.exports = {
  // 查询全部动态列表
  getDynamicList() {
    return db.query(
      "SELECT * from dynamic WHERE d_status < 3 ORDER BY d_status DESC,createTime DESC"
    );
  },

  // 查询用户发布动态列表
  getDynamicListByUserId(d_fk_uId) {
    return db.query("select * from dynamic where d_fk_uId = ?", [d_fk_uId]);
  },

  // 根据type类型查询全部动态列表
  getDynamicListByType(d_type) {
    return db.query(
      "select * from dynamic where d_type = ? and d_status < 3 ORDER BY d_status DESC,createTime DESC",
      [d_type]
    );
  },

  // 发布动态
  publishDynamic(dynamic) {
    return db.query("insert into dynamic set ?", dynamic);
  },

  // 修改动态
  updateDynamic(d_id, d_title, d_type, d_content, d_pictures) {
    return db.query(
      "update dynamic set d_title = ?,d_type = ?, d_content = ?, d_pictures = ? where d_id = ?",
      [d_title, d_type, d_content, d_pictures, d_id]
    );
  },

  // 删除动态
  deleteDynamic(d_id) {
    return db.query("DELETE FROM dynamic WHERE d_id=?", [d_id]);
  },

  // 问题反馈
  help(help_info) {
    return db.query("insert into help set ?", help_info);
  },

  // 查询问题反馈历史记录
  getAllHelpInfos(help_fk_uId) {
    return db.query(
      "select * from help where help_fk_uId = ? ORDER BY create_time DESC",
      [help_fk_uId]
    );
  },

  // 根据动态id获取动态信息
  getDynamicDetailById(d_id) {
    return db.query(
      "select * from dynamic where d_id = ? ORDER BY createTime DESC",
      [d_id]
    );
  },

  // 动态查看次数+1
  addDynamicViewNum(d_id) {
    return db.query(
      "update dynamic_information set info_count = info_count + 1 where info_fk_dId = ?",
      [d_id]
    );
  },

  // 查询动态列表浏览次数前5
  getDynamicListByTop5() {
    return db.query(
      "SELECT * FROM dynamic_information, dynamic where dynamic_information.info_fk_dId = dynamic.d_id ORDER BY info_count DESC limit 5"
    );
  },

  // 模糊查询
  getDynamicByFuzzy(query) {
    let dbStr = `SELECT * FROM dynamic WHERE d_title like '%${query}%'`;
    return db.query(dbStr);
  },

  // 查询上一条数据
  getLastDynamic(d_id) {
    let dbStr = `select * from dynamic where createTime >(select createTime from dynamic where d_id =${d_id})order by createTime ASC limit 1`;
    return db.query(dbStr);
  },

  // 查询下一条数据
  getNextDynamic(d_id) {
    let dbStr = `select * from dynamic where createTime <(select createTime from dynamic where d_id =${d_id})order by createTime DESC limit 1`;
    return db.query(dbStr);
  },

  // 评论查询
  getCommentsById(c_fk_dId) {
    let dbStr = `select comment.*,users_information.info_avatar,users_information.info_fk_uId,users_information.info_name,reply.reply_list from comment,users_information,reply where comment.c_fk_dId = ${c_fk_dId} and comment.from_uId=users_information.info_fk_uId and comment.c_id=reply.reply_fk_cId order by create_time ASC`;
    return db.query(dbStr);
  },

  // 发表评论
  publishComment(comment) {
    return db.query("insert into comment set ?", comment);
  },

  // 回复评论
  replyComment(reply_list, reply_fk_cId) {
    return db.query("update reply set reply_list = ? where reply_fk_cId = ?", [
      reply_list,
      reply_fk_cId,
    ]);
  },
};
