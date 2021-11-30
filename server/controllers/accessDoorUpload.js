const dbOperate = require('../services/mysql/dbOperate')

const handle_accessDoorUpload = async (ctx, next) => {
    try {
        // console.log("ctx.request.body", ctx.request.body)
        // 1.验证请求参数：
        validatePostRequestBody(ctx.request.body);
        let dataContent = ctx.request.body.dataContent.map(e => {
            e.deviceId = ctx.request.body.deviceId;
            e.remarks = ctx.request.body.remarks;
            return e;
        })
        let result = await dbOperate.bulkCreate({ tableName: 'access_door_upload_data', dataContent });
        // console.log(result)
        ctx.body = { code: 1, message: "上传成功", data: dataContent.map(e => ({ code: 1, message: 'success' })) }
    } catch (error) {
        ctx.response.body = { code: -100, message: error.message }
    }
    await next()
}

function validatePostRequestBody(reqBody) {
    if (!reqBody.deviceId) throw new Error('设备序列号不能为空');
    if (!Array.isArray(reqBody.dataContent) || reqBody.dataContent.length < 1)
        throw new Error('epc数据不能为空')
}

module.exports = {
    "POST /v1.0/accessDoor/upload": handle_accessDoorUpload,
}