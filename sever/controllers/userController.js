const model = require('../models/userModel')
const {
    createToken
} = require('../auth')

module.exports = {
    // 用户登录
    async userLogin(ctx) {
        let {
            u_phone,
            u_pass,
        } = ctx.request.body;
        let results = await model.userLogin(u_phone, u_pass);
        console.log(results);
        if (results.length > 0) {
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
        } else {
            ctx.body = {
                userInfo: results,
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

    // 根据用户id获取用户信息
    async getUserInfoById(ctx) {
        let {
            u_id
        } = ctx.request.body;
        let results = await model.getUserInfoById(u_id);
        if (results.length > 0) {
            ctx.body = {
                userInfo: results,
            }
        }
    },

    // 更新用户信息
    async updateUserInfo(ctx) {
        let {
            u_age,
            u_name,
            u_email,
            u_hobby,
            u_id,
            u_avatar
        } = ctx.request.body;
        let results = await model.updateUserInfo(u_age, u_name, u_email, u_hobby, u_id, u_avatar);
        // console.log(results.insertId);
        if (results.insertId >= 0) {
            ctx.body = {
                userInfo: results,
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