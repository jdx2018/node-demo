const mysql = require('mysql') 
const { resolve } = require('path/posix')

//数据库信息测试
const de_asset = {
    connectionLimit: 2,
    host: '192.168.50.200',
    user: 'host',
    password: 'host',
    port: 3306,
    database: 'test'
}

//创建连接池
var pool = mysql.createPool(de_asset)
async function getConnection() {
    return new Promise((resolve, reject) =>{
        pool.getConnection((err, connection) => {
            if(err){
                reject(err);
            }else{
                resolve(connection)
            }
        })
    })
}

//开始一个事务
async function beginTrans(con){
    if(!con){
        con = await getConnection();
    }
    return new Promise((resolve, reject) => {
        con.beginTransaction((err)=>{
            if(err){
                reject(err)
            }else{
                resolve(con)
            }
        })
    })
}

//提交一个事务
async function commitTrans(con){
    if(!con){
        con = await getConnection();
    }
    return new Promise((resolve, reject)=>{
        con.commit((err)=>{
            if(err){
                reject(err)
            }else{
                resolve(err)
            }
        })
    })
}

//回滚一个事务
async function rollbackTrans(con){
    if(!con){
        con = await getConnection();
    }
    return new Promise((resolve, reject)=>{
        con.rollback((err)=>{
            if(err){
                reject(err)
            }else{
                resolve(err)
            }
        })
    })
}

async function validation(tableName, userId, password)  {
    const con = getConnection
    let userDTO = await con.query('select * from ? where userId = ? and password = ? ', [tableName, userId, password], function(err, result) {
        if(err){
            console.log(err)
            return
        }else{
            return result
        }
    })
}

module.exports.validation = validation