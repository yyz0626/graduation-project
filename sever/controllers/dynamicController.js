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
            d_fk_uid
        } = ctx.request.body;
        let results = await model.publishDynamic({
            d_title,
            d_type,
            d_content,
            d_fk_uid
        })
        console.log(results);
        if (results.insertId) {
            ctx.body = {
                message: "发表成功"
            }
        }
    },

    async getBlogComment(ctx) {
        let blog_id = ctx.query.blogId;
        let results = await model.getBlogComment(blog_id)
        ctx.body = {
            comments: results
        }
    },
    async getBlogDetail(ctx) {
        let blog_id = ctx.query.blogId;
        let results = await model.getBlogDetail(blog_id);
        ctx.body = {
            detail: results
        }
    },

    async writeComment(ctx) {
        // console.log(ctx.request);
        let {
            comm_content,
            blog_id,
            user_id
        } = ctx.request.body;
        if (comm_content.trim().length == 0) {
            ctx.body = {
                message: "评论不能为空"
            }
        } else {
            let results = await model.saveContent({
                comm_content,
                blog_id,
                user_id
            })
            // console.log(results);
            if (results.insertId) {
                ctx.body = {
                    message: "评论成功"
                }
            } else {}
        }
    },
    async delete(ctx) {
        let {
            blogId
        } = ctx.request.body;
        console.log(blogId);
        let results = await model.deleteBlog(blogId);
        // console.log(results);
        if (results) {
            // console.log(1);
            ctx.body = {
                message: '删除成功'
            }
        } else {}
    }
};