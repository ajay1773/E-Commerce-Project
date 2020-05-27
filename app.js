var express = require('express');
var bodyParser =require('body-parser');
var app = express();
var MongoClient = require("mongodb").MongoClient;//making instance of the database
var url ="mongodb://localhost:27017/test";
var urlencodedParser = bodyParser.urlencoded({extended:false});
app.set('view engine',"ejs");
app.use('/assets',express.static('assets'));
app.get('/',(req,res)=>{
    res.send("kudoos");
});
app.get('/Login',(req,res)=>{
    res.render('Login');
});
app.post('/Login',urlencodedParser,(req,res)=>{
    console.log(req.body);
    MongoClient.connect(url,(err,db)=>{
        if (err) {
            throw err
        };
        var dbo = db.db("test");
        var adminData = req.body;
        dbo.collection('users').insertOne(adminData,(erro,resultent)=>{
           if (erro) {
               throw erro
           }
           console.log("inserted");
        })
    });
    res.render('Login');
});
//Merchent Login
app.get('/MerchentLogin',(req,res)=>{
    res.render('MerchentLogin');
});
/*app.post('/MerchentLogin',urlencodedParser,(req,res)=>{
console.log(req.body);
res.render('MerchentLogin');
});*/
//Customer Login
app.get('/CustomerLogin',(req,res)=>{
    res.render('CustomerLogin');
});

app.post('/CustomerLogin',urlencodedParser,(req,res)=>{
       MongoClient.connect(url,(err,db)=>{
        if (err) {
            throw err
        };
        var dbo = db.db("test");
        var custData = req.body;
        dbo.collection('Customes').insertOne(custData,(erro,resultent)=>{
           if (erro) {
               throw erro
           }
           console.log("inserted");
        })
    });
    res.render('CustomerLogin',{data:req.params.name});
});
app.listen(3000);
