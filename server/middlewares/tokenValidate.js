const token_service = require('../services/auth/token_service')

// token验证中间件
const tokenValidate = async (ctx, next) => {
    let url = ctx.request.url;
    let reqBody = ctx.request.body;
    if (!reqBody.tenantId || !reqBody.userId) throw new Error("企业账户或用户名不能为空.")

    if (url.indexOf('/v1.0') !== -1 && url !== '/v1.0/login') {
        const token = ctx.headers["access_token"]
        // 2.验证token：
        const res_token = await token_service.token_verify(reqBody.tenantId + reqBody.userId, token);
        if (res_token.code != 1) throw new Error(res_token.message)
    }
    await next()
}

module.exports = { tokenValidate };