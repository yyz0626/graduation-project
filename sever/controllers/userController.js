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
    async regist(ctx) {
        //1.接受表单数据
        let {
            username,
            password,
            nickname
        } = ctx.request.body;
        // 2.安全验证
        if (username.trim().length == 0) {
            ctx.body = {
                message: "用户名不正确"
            }
        } else if (password.length == 0) {
            ctx.body = {
                message: "密码格式有误"
            }
        }
        //3.连接数据库
        else {
            let user = await model.getUserByUsername(username);
            if (user.length == 0) {
                let results = await model.saveUser({
                    username,
                    password,
                    nickname
                })
                if (results.insertId) {
                    ctx.body = {
                        message: "注册成功"
                    }
                } else {}
                console.log(0);
            } else {
                ctx.body = {
                    message: "用户名存在"
                }
            }
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