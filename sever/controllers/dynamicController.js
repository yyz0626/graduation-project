const model = require('../models/dynamicModel')

// console.log(ctx.request.body);

module.exports = {
    // 查询全部动态列表
    async getDynamicList(ctx) {
        let results = await model.getDynamicList();
        ctx.body = {
            dynamicList: results,
            length: results.length
        }
    },

    // 根据type类型查询全部动态列表
    async getDynamicListByType(ctx) {
        let {
            d_type
        } = ctx.request.body;
        let results = await model.getDynamicListByType(d_type);
        ctx.body = {
            dynamicList: results,
            length: results.length
        }
    },

    // 发布动态
    async publishDynamic(ctx) {
        let {
            d_title,
            d_type,
            d_content,
            d_fk_uId,
            d_pictures
        } = ctx.request.body;
        let results = await model.publishDynamic({
            d_title,
            d_type,
            d_content,
            d_fk_uId,
            d_pictures
        })
        // console.log(results);
        if (results.insertId) {
            ctx.body = {
                message: "发表成功"
            }
        }
    },

    // 根据动态id获取动态信息
    async getDynamicDetailById(ctx) {
        let {
            d_id
        } = ctx.request.body;
        let results = await model.getDynamicDetailById(d_id);
        // console.log(results);
        if (results.length > 0) {
            await model.addDynamicViewNum(d_id)
            const lastDynamic = await model.getLastDynamic(d_id)
            const nextDynamic = await model.getNextDynamic(d_id)
            ctx.body = {
                dynamicList: results,
                lastDynamic: lastDynamic,
                nextDynamic: nextDynamic,
            }
        }
    },

    // 查询动态列表浏览次数前5
    async getDynamicListByTop5(ctx) {
        let results = await model.getDynamicListByTop5();
        ctx.body = {
            dynamicList: results,
            length: results.length
        }
    },

    // 模糊查询
    async getDynamicByFuzzy(ctx) {
        let {
            string
        } = ctx.request.body;
        let results = await model.getDynamicByFuzzy(string);
        ctx.body = {
            dynamicList: results,
            length: results.length
        }
    },

    // 查询评论
    async getCommentsById(ctx) {
        let {
            c_fk_dId
        } = ctx.request.body;
        let results = await model.getCommentsById(c_fk_dId);
        ctx.body = {
            commentsList: results,
        }
    },

    // 发表评论
    async publishComment(ctx) {
        let {
            c_fk_dId,
            from_uId,
            c_content,
        } = ctx.request.body;

        let results = await model.publishComment({
            c_fk_dId,
            from_uId,
            c_content,
        });
        if (results.insertId) {
            ctx.body = {
                message: "发表成功"
            }
        }
    },

    // 回复评论
    async replyComment(ctx) {
        let {
            reply_list,
            reply_fk_cId
        } = ctx.request.body;
        let results = await model.replyComment(reply_list, reply_fk_cId);
        if (results.insertId >= 0) {
            ctx.body = {
                message: "发表成功"
            }
        }
    },


};