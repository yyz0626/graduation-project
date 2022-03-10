const model = require('../models/userModel')
const {
    createToken
} = require('../auth')

module.exports = {
    async userLogin(ctx) {
        let {
            u_phone,
            u_pass,
        } = ctx.request.body;
        let results = await model.userLogin(u_phone, u_pass);
        if (results) {
            let u_id = results[0].u_id
            let payload = {
                u_id: u_id,
                myToken: 'myToken'
            }
            var token = createToken(payload);
            ctx.body = {
                userInfo: results,
                token: token
            }
        }
        // } else {
        //     ctx.body = 'fail'
        // }
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