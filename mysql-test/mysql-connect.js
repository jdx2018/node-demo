var mysql  = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'test'
});
 
connection.connect();
 
// var  sql = 'SELECT * FROM websites';
// //查
// connection.query(sql,function (err, result) {
//         if(err){
//           console.log('[SELECT ERROR] - ',err.message);
//           return;
//         }
 
//        console.log('--------------------------SELECT----------------------------');
//        console.log(result);
//        console.log('------------------------------------------------------------\n\n');  
// });

// var addSql = 'INSERT INTO websites(Id, name, url, alexa, country) values (0, ?, ?, ?, ?)';
// var addSqlParams = ['测试', '测试', '1234', '测试'];
// connection.query(addSql, addSqlParams, function(err, result){
//     if(err){
//         console.log('[INSERT ERROR] - ', err.message);
//         return;
//     }

//     console.log('--------------------------INSERT----------------------------');
//     console.log('INSERT ID:', result);
//     console.log('--------------------------INSERT----------------------------\n\n');
// })

// var updateSql = 'UPDATE websites set name = ?, url = ?, alexa = ?, country = ?';
// var updateSqlParams = ["更新测试", "更新测试", "123456", "更新测试"];
// //改
// connection.query(updateSql,updateSqlParams,function (err, result) {
//     if(err){
//           console.log('[UPDATE ERROR] - ',err.message);
//           return;
//     }        
//    console.log('--------------------------UPDATE----------------------------');
//    console.log('UPDATE affectedRows',result.affectedRows);
//    console.log('-----------------------------------------------------------------\n\n');
//  });

var delSql = 'DELETE FROM websites where id=6';
//删
connection.query(delSql,function (err, result) {
        if(err){
          console.log('[DELETE ERROR] - ',err.message);
          return;
        }        
 
       console.log('--------------------------DELETE----------------------------');
       console.log('DELETE affectedRows',result.affectedRows);
       console.log('-----------------------------------------------------------------\n\n');  
});
 
connection.end();