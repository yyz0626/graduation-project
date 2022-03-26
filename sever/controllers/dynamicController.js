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

    // 查询用户发布动态列表
    async getDynamicListByUserId(ctx) {
        let {
            d_fk_uId
        } = ctx.request.body;
        let results = await model.getDynamicListByUserId(d_fk_uId);
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
            d_pictures,
            d_fk_uName
        } = ctx.request.body;
        let results = await model.publishDynamic({
            d_title,
            d_type,
            d_content,
            d_fk_uId,
            d_pictures,
            d_fk_uName
        })
        // console.log(results);
        if (results.insertId) {
            ctx.body = {
                message: "发表成功"
            }
        }
    },

    // 修改动态
    async updateDynamic(ctx) {
        let {
            d_id,
            d_title,
            d_type,
            d_content,
            d_pictures,
        } = ctx.request.body;
        let results = await model.updateDynamic(
            d_id,
            d_title,
            d_type,
            d_content,
            d_pictures,
        )
        // console.log(results);
        if (results.insertId >= 0) {
            ctx.body = {
                message: "发表成功"
            }
        }
    },

    // 修改动态
    async deleteDynamic(ctx) {
        let {
            d_id,
        } = ctx.request.body;
        let results = await model.deleteDynamic(d_id)
        // console.log(results);
        if (results.insertId >= 0) {
            ctx.body = {
                message: "发表成功"
            }
        }
    },

    // 问题反馈
    async help(ctx) {
        let {
            help_detail,
            help_fk_uId
        } = ctx.request.body;
        let results = await model.help({
            help_detail,
            help_fk_uId
        })
        if (results.insertId >= 0) {
            ctx.body = {
                message: "反馈成功"
            }
        }
    },

    // 查询问题反馈历史记录
    async getAllHelpInfos(ctx) {
        let {
            help_fk_uId
        } = ctx.request.body;
        let results = await model.getAllHelpInfos(help_fk_uId)
        // console.log(results);
        // if (results.insertId >= 0) {
        ctx.body = {
            help_info_list: results
        }
        // }
    },


    // 根据动态id获取动态信息
    async getDynamicDetailById(ctx) {
        let {
            d_id
        } = ctx.request.body;
        let results = await model.getDynamicDetailById(d_id);
        if (results.length > 0) {
            await model.addDynamicViewNum(d_id)
            const lastDynamic = await model.getLastDynamic(d_id)
            const nextDynamic = await model.getNextDynamic(d_id)
            ctx.body = {
                dynamicList: results,
                lastDynamic: lastDynamic,
                nextDynamic: nextDynamic,
            }
        } else {
            ctx.status = 402;
            ctx.body = {
                dynamicList: []
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