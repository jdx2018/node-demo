const fs = require('fs');

fs.readFile('E:/fs测试.txt','utf-8',(err, data) => {
    if(err){
        console.log(err);
        return;
    }
    console.log(data);
})
const test = '测试数据';
fs.writeFile('E:/fs测试.txt', test, { flag : 'a+' }, err => {
    if(err) {
        console.log(err);
        return;
    }
})
fs.readFile('E:/fs测试.txt','utf-8',(err, data) => {
    if(err){
        console.log(err);
        return;
    }
    console.log(data);
})