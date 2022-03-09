const model = require('../models/userModel')
const {
    createToken
} = require('../auth')

module.exports = {
    async login(ctx) {
        //  1. 接受表单数据
        let {
            username,
            password
        } = ctx.request.body;
        //2.安全验证
        if (username.length == 0) {
            await ctx.render('err', {
                message: "请输入用户名"
            })
        } else {
            //3.连接数据库
            let results = await model.getUserByNamePwd(username, password);
            // let uname = 1;
            let uname = results[0].username;
            let uid = results[0].user_id;
            if (results.length > 0) {
                let payload = {
                    userId: Math.random(),
                    username
                }
                var token = createToken(payload);
                ctx.body = {
                    state: "success",
                    token,
                    uname,
                    uid
                }
            } else {
                ctx.body = 'fail'
            }
        }
    },
    // 用户注册
    async userRegist(ctx) {
        let {
            u_name,
            u_pass,
            u_age,
            u_gender,
            u_phone,
            u_email,
            status,
        } = ctx.request.body;
        let results = await model.userRegist({
            u_name,
            u_pass,
            u_age,
            u_gender,
            u_phone,
            u_email,
            status,
        })
        if (results.insertId) {
            ctx.body = {
                message: "注册成功"
            }
        }
    },

    // 用户名重复
    async checkUserNameRepeat(ctx) {
        let {
            u_name,
        } = ctx.request.body;
        let results = await model.checkUserNameRepeat(u_name)
        ctx.body = {
            userDetails: results
        }
    },





    async getUserId(ctx) {
        let results = await model.getUserId()
        console.log('2222', results);
        ctx.body = {
            comments: results
        }
    }
};