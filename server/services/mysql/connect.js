const { Sequelize, DataTypes } = require('sequelize')
const config = require('../../config')

const sequelize = new Sequelize(config.db.dbbase, config.db.user, config.db.password, {
    dialect: 'mysql',    //数据库类型
    host: config.db.host,   //主机地址
    port: config.db.port,
    pool: {      //连接池设置
        max: 5,  //最大连接数
        idle: 30000,
        acquire: 60000
    },
    // dialectOptions: {
    //     charset: 'utf8mb4',  //字符集
    //     collate: 'utf8mb4_unicode_ci'
    // },
    define: {   //模型设置
        freezeTableName: true,    //自定义表面，不设置会自动将表名转为复数形式
        timestamps: false    //自动生成更新时间、创建时间字段：updatedAt,createdAt
    },
    // 控制打印sql语句
    logging: false
})

module.exports = {
    sequelize,
    DataTypes
}