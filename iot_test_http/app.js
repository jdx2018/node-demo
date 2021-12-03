var http = require('http');
var url = require('url');
var log4js = require('log4js')
const date = require("silly-datetime");

const getWeather = require('E:/iot_test_http/controllers/getWeather')
const today = date.format(new Date(),'YYYY-MM-DD');

log4js.configure({
   appenders:{
      out:{type:'stdout'},
      info:{type:'file', filename:'./logs/info'+today+'.log'}
   },
   categories:{
      default:{appenders:['out', 'info'], level:'info'}
   }
});

var logger = log4js.getLogger('info');


 
// 创建服务器
http.createServer( function (request, response) {  
   // 解析请求
   var query = url.parse(request.url, true).query;
      if(!(JSON.stringify(query) == "{}")){
         logger.info('访问城市编号为'+query.cityIds+'的城市')
         let data = ''
         getWeather.getWeather(data, query.cityIds, function(data){

            response.writeHead(200, {
               'Content-Length': Buffer.byteLength(data),
               'Content-Type': 'text/plain'
            }).end(data);
         });
      }
}).listen(8080);
 
// 控制台会输出以下信息
console.log('Server running at http://192.168.50.200:8080/');

