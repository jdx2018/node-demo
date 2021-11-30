const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const cache = { }; // 缓存token
const EXP_TIME = 1 * 60 * 60  // token超时时间：单位/秒
const secret = 'supoin_supply'


// 错误信息列表：
const ERROR_MESSAGE = {
    signError: { code: -100, message: "token签发失败" },
    tokenEmpty: { code: -101, message: "token不能为空" },
    tokenNotExistsOrExpired: { code: -102, message: "token不存在或已过期，请重新登录." },
    tokenVerifyError: { code: -103, message: "token验证失败" },
    tokenUserNotMatch: { code: -104, message: "token与用户不匹配" }
}

async function token_sign(tenantId_userId) {
    try {
        // 签发token：
        const token = jwt.sign({
            tenantId_userId,
            exp: Math.floor(Date.now() / 1000) + EXP_TIME
        }, secret)
        
        // 生成token项：
        let tokenItem = {
            tenantId_userId: tenantId_userId,
            tokenId: md5(token),
            token: token,
            timeStamp: Date.now()
        }
        // 缓存token:
        cache[tenantId_userId] = tokenItem;

        return { code: 1, message: "登录成功", data: tokenItem.tokenId };
    } catch (error) {
        ERROR_MESSAGE.signError.message += "," + error.message
        throw ERROR_MESSAGE.signError;
    }
}


async function token_verify(tenantId_userId, token) {
    try {
        if (!token) {
            return ERROR_MESSAGE.tokenEmpty;
        }
        if (!cache[tenantId_userId]) {
            return ERROR_MESSAGE.tokenNotExistsOrExpired
        }
        // 解析token：
        const decoded = jwt.verify(cache[tenantId_userId].token, secret)
        if (decoded.tenantId_userId !== tenantId_userId) {
            return ERROR_MESSAGE.tokenUserNotMatch
        }
        // 重新生成token：
        const new_token = token_sign(tenantId_userId)

        return { code: 1, message: "数据认证通过", data: new_token };
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return ERROR_MESSAGE.tokenNotExistsOrExpired
        }
        const { code, message } = ERROR_MESSAGE.tokenVerifyError
        return { code, message: message + error.message }
    }
}

/**
 * 使用MD5加密：
 */
function md5(str) {
    var cryptor = crypto.createHash('md5');
    return cryptor.update(str).digest('hex');
}

module.exports = { token_sign, token_verify }


// function test(){
//     const res_token = token_sign("hhf")
//     console.log(res_token.data)

//     setTimeout(()=>{
//         const res = token_verify("hhf",res_token.data)
//         console.log(res)
//     },3000)
// }

// test()
