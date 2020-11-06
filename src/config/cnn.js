const mysql = require('mysql');

var cnn = mysql.createConnection({
    host:'d13xat1hwxt21t45.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    database:'qaoldxdk4qx90mlu',
    user:'nnbmlzf1y2xi0bhp',
    password:'pkh1haqmd6ayhl3s'
});

cnn.connect((e) =>{
    if(e) throw e;
    console.log('conectado');
});

module.exports = cnn;