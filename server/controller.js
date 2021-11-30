const fs = require('fs');

const addMapping = (router, mapping) => {
    for (let url in mapping) {
        if (url.startsWith('GET ')) {
            let path = url.substring(4)
            router.get(path, mapping[url])
        } else if (url.startsWith('POST ')) {
            let path = url.substring(5);
            router.post(path, mapping[url])
        } else {
            console.log('invalid request url: ' + url)
        }
    }
}
const addControllers = (router, dir) => {
    fs.readdirSync(__dirname + '/' + dir).filter(f => {
        return f.endsWith('.js');
    }).forEach(f => {
        let mapping = require(__dirname + '/' + dir + '/' + f);
        addMapping(router, mapping);
    })
}

module.exports = function (dir) {
    let controllers_dir = dir || 'controllers';
    let router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};