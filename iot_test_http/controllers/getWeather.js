var http = require('http');

var url = 'http://aider.meizu.com/app/weather/listWeather'

var getWeather = (data, cityIds, callback) => {
    
    argumentVerify(cityIds, callback);
    rul = url+'?cityIds='+cityIds;
    var req = http.get(rul, function(res){
        res.on('data', function(chunk){
            data += chunk;
        });
        res.on('end', function(){
            data = JSON.stringify(JSON.parse(data).value);
            callback(data);
        });
    });
    req.on('error', function(err){
        console.error(err);
    });
    req.end();
}

//参数验证
function argumentVerify(cityIds, callback){
    let num = cityIds.length;
    if(num != 9){
        callback('城市ID必须是9位的数字!')
    }
}

module.exports = {
    getWeather : getWeather
}