const fs = require('fs');
fs.writeFile('./write-test.txt', 'testtesttesttesttesttest',err => {
    if(err){
        console.log(err);
    }
})