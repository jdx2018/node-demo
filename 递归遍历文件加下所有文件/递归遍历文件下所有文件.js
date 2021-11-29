const fs = require('fs');
const path = require('path');

const test = function fileTravesal(filePath){
    fs.readdir(filePath,(err, fileList) => {
        if(err){
            console.log('文件读取错误!');
        }else{
            for(let item of fileList){
                let newFilePath = path.join(filePath, item)
                console.log(newFilePath);
                
                fs.stat(newFilePath, function(err, message){
                    if(err){
                        console.log('文件读取错误!')
                    }else if(message.isFile()){ 
                        console.log(newFilePath);
                    }else if(message.isDirectory()){
                        fileTravesal(newFilePath);
                    }
                })
            }
        }
    })
}

module.exports.test = test;

function f(){
    let a = 1;
    {let a = 2;}
    console.log(a);
}