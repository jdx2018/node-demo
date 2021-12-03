var request = require('request-promise');

var url = "http://aider.meizu.com/app/weather/listWeather"+"?cityIds="+"101240101" ;


/**
 * 数据下载：
 * @param {*} ctx
 * @param {*} next
 */
const getWeather = async (ctx, next) => {
    try{
        let result = await request(url)
        ctx.body = JSON.parse(result)
        // console.log(ctx.request)
        // request(url, function (error, res, body) {
        //     console.log(url)
        //     if(error){
        //         console.log(error)
        //     }
        //     if (!error && res.statusCode == 200) {
        //     ctx.body = JSON.stringify(body)
        //     // console.log(ctx.body)
        //   }
        // })

        // ctx.body = '进来了'
    } catch (error){
        ctx.response.body = { code: -100, message: error.message }
    }
    await next()
};


module.exports = {
    "GET /v1.0/getWeather": getWeather
}