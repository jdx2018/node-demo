const { sequelize } = require('./connect')
const schema = require('./schema');

module.exports = {
    findAll: async (params) => {
        const { tableName, query, fields, pageNum, pageSize } = params;
        let data, total;
        if (pageNum && pageSize) {
            data = await schema[tableName].findAll({
                attributes: fields,
                where: query,
                offset: (pageNum - 1) * pageSize,
                limit: pageSize
            })
            total = await schema[tableName].count({
                where: query
            })
        } else {
            data = await schema[tableName].findAll({
                where: query
            })
        }
        data = JSON.parse(JSON.stringify(data))
        return total ? { data, total } : data
    },
    findOne: async (params) => {
        const { tableName, query, fields } = params;
        return await schema[tableName].findOne({
            attributes: fields,
            where: query
        })
    },
    create: async (params) => {
        const { tableName, dataContent } = params;
        return await schema[tableName].create(dataContent);
    },
    // 批量插入操作，重复的数据则更新
    bulkCreate: async (params) => {
        const { tableName, dataContent, updateOnDuplicate } = params;
        return await schema[tableName].bulkCreate(dataContent, { updateOnDuplicate });
    },
    destroy: async (params) => {
        const { tableName, query } = params;
        return await schema[tableName].destroy({
            where: query
        })
    },
    update: async (params) => {
        const { tableName, query, dataContent } = params;
        return await schema[tableName].update(dataContent, {
            where: query
        })
    },
    // transaction: async (trans) => {
    //     try {
    //         const result = await sequelize.transaction(async t => {
    //             for (let i = 0; i < trans.length; i++) {
    //                 const { params, operateType } = trans[i];
    //                 await this[operateType](params)
    //             }
    //         })
    //         return { name: 'success', message: "事务执行成功" }
    //     } catch (error) {
    //         return { name: 'failed', message: "事务执行失败：" + error }
    //     }
    // }
}
