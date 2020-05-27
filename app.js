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
        var userData = req.body;
        dbo.collection('users').insertOne(userData,(erro,resultent)=>{
           if (erro) {
               throw erro
           }
           console.log("inserted");
        })
    });
    res.render('Login');
});
app.listen(3000);
