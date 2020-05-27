var http =require('http');
var fs = require('fs');
http.createServer((req,res)=>{
    if (req.url==="/login") {
    res.writeHead(200,{"Content-Type":"text/html"});
    fs.readFile('./Login.html',(err,data)=>{
        if (err) {
            console.log("error");
        } else {
            res.end(data);
        };
    });    
    }
}).listen(3000);