const fs = require('fs');
const a = fs.readFile('./fs测试用.txt', 'utf-8', (err, doc) => {
    if(err){
        console.log(err);
    } else {
        console.log(doc);
    }
});
console.log(a);


