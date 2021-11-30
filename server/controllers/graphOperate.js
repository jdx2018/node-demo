const dbOperate = require('../services/mysql/dbOperate')
const schema = require('../services/mysql/schema')
const operateTypeEnum = {
    total: ["findOne", "findAll", "create", "bulkCreate", "destroy", "update"],
    needQuery: ["findOne", "findAll", "destroy", "update"],
    needDataContent: ["create", "bulkCreate", "update"]
}
/**
 * 
 * @param {*} ctx 
 * @param {*} next 
 * ctx.request.body 的参数示例：
 * {
 *    tenantId: "",
 *    orgId: "",
 *    userId: "",
 * 
 *    tableName: "",
 *    operateType: "",
 *    query: {},
 *    dataContent: {}/[],
 *    pageNum: "",
 *    pageSize: "",
 * }
 */

const graphOperate = async (ctx, next) => {
    try {
        // console.log("ctx.request.body", ctx.request.body)
        // 1.验证请求参数：
        validatePostRequestBody(ctx.request.body);
        const {
            tableName, operateType, query, dataContent, fields,
            pageNum, pageSize,
            dataType, fieldId,
            updateOnDuplicate
        } = ctx.request.body;
        if (operateType === 'destroy') {
            return ctx.body = { code: 1, message: '暂停删除操作' }
        }
        // 2.数据库操作：
        const params = { tableName, query, dataContent, fields, pageNum, pageSize, updateOnDuplicate }
        let result = await dbOperate[operateType](params);
        // 3.数据格式化操作：
        if (dataType && dataType === "tree") {
            result = format_list_to_tree(result, fieldId);
        }
        // 如果查询的是角色列表，则应返回角色的所属权限，放在children属性下：
        if (tableName === "v_role_list" && pageNum && pageSize) {
            result.data = await appendRightTreeListForRole(result.data)
        }
        // console.log(result)
        ctx.body = { code: 1, message: "success", data: result }
    } catch (error) {
        console.log(error)
        ctx.response.body = error.name === "SequelizeUniqueConstraintError"
            ? { code: -111, message: "重复的编号" } :
            { code: -100, message: error.message }
    }
    await next()
}
// 验证请求参数
function validatePostRequestBody(body) {
    const { tableName, operateType, query, dataContent, fields, pageNum, pageSize, dataType, fieldId } = body;
    if (!Object.keys(schema).includes(tableName))
        throw new Error(`[${tableName}]表名未定义`)
    if (!operateTypeEnum["total"].includes(operateType))
        throw new Error(`[${operateType}]操作类型未定义`)
    if (operateTypeEnum["needQuery"].includes(operateType) && typeof query !== "object")
        throw new Error(`查询字段不能为空`);
    if (operateTypeEnum["needDataContent"].includes(operateType) && !dataContent)
        throw new Error(`dataContent字段不能为空`);
    if (fields && (!Array.isArray(fields) || fields.length < 1))
        throw new Error("属性参数attributes必须为数组且不能为空")
    if ((pageNum && !pageSize) || (!pageNum && pageSize))
        throw new Error(`pageSize和pageSize字段必须同时存在`);
    if ((dataType && !fieldId) || (!dataType && fieldId))
        throw new Error(`dataType和fieldId字段必须同时存在`)
}

module.exports = {
    "POST /v1.0/graphOperate": graphOperate,
}
