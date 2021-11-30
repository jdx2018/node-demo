const log4js = require('log4js');
const path = require('path');

log4js.configure({
    appenders: {
        http: {
            type: 'dateFile',
            filename: path.resolve(__dirname, './log/http_log/http_log.log')
        },
        error: {
            type: 'dateFile',
            filename: path.resolve(__dirname, './log/err_log/err_log.log')
        },
        console: {
            type: 'console'
        }
    },
    categories: {
        http: {
            appenders: ['http'],
            level: 'trace',
        },
        error: {
            appenders: ['error'],
            level: 'error'
        },
        default: {
            appenders: ['console'],
            level: 'info'
        }
    }
})

const logService = {
    log_http: (message) => {
        log4js.getLogger('http').trace(message)
    },
    log_error: (message) => {
        log4js.getLogger('error').error(message)
    }
}

module.exports = logService;

