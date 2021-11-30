const dbOperate = require('./dbOperate')

test()
async function test() {
    console.log('start...')
    const query = { userId: 'lisi', tenantId: 'test', orgId: '1' }
    const params = { 
        tableName: "tenant_org", 
        updateOnDuplicate: ['tenantId', 'orgId'], 
        dataContent: [
            { tenantId: 'test',orgName:'市场部',orgId:'sc',level:'9',parentId:'1' }
        ] 
    }
    const res = await dbOperate.bulkCreate(params)
    console.log(res)
}