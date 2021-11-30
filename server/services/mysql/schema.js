const { sequelize, DataTypes } = require('./connect')
const dayjs = require('dayjs')
const _ = require('lodash')
// 公共字段：
const common_fields = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    createTime: {
        type: DataTypes.DATE,
        get() {
            return this.getDataValue('createTime') ? dayjs(this.getDataValue('createTime')).format('YYYY-MM-DD HH:mm:ss') : ''
        }
    },
    createPerson: DataTypes.STRING(50),
    updateTime: {
        type: DataTypes.DATE,
        get() {
            return this.getDataValue('updateTime') ? dayjs(this.getDataValue('updateTime')).format('YYYY-MM-DD HH:mm:ss') : ''
        }
    },
    updatePerson: DataTypes.STRING(50),
    remarks: DataTypes.STRING(200)
}

module.exports = {
    access_door_upload_data: sequelize.define('access_door_upload_data', Object.assign({
        deviceId: DataTypes.STRING(20),
        epc: DataTypes.STRING(50),
        direction: DataTypes.STRING(20),
        sensorDateTime: {
            type: DataTypes.DATE,
            get() {
                return this.getDataValue('sensorDateTime') ? dayjs(this.getDataValue('sensorDateTime')).format('YYYY-MM-DD HH:mm:ss') : ''
            }
        },
    }, common_fields), {
        initialAutoIncrement: 1,
        timestamps: false,
        tableName: 'access_door_upload_data',
        indexes: [{
            unique: true,
            using: 'BTREE',
            name: 'idx_device_epc',
            fields: ['deviceId', 'epc']
        }]
    }),
}

