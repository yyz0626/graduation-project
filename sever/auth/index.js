let jwt = require("jsonwebtoken");
let secretKey = "**my_secret_key$$";

module.exports = {
  createToken: (payload) => {
    return jwt.sign(payload, secretKey, {
      expiresIn: "5h",
    });
  },
  verifyToken: async (ctx, next) => {
    if (ctx.header.authorization) {
      let parts = ctx.header.authorization.split(" ");
      let bearer = parts[0];
      let token = parts[1];
      if (/^Bearer$/.test(bearer)) {
        try {
          //验证token
          jwt.verify(token, secretKey);
          await next();
        } catch (error) {
          ctx.status = 401;
          // ctx.body = "token不存在或已过期"
          ctx.body = {
            state: "auth-fail",
          };
        }
      }
    }
  },
};
