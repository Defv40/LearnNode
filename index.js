const chalk = require('chalk');
const fs = require('fs');
const http = require('http');

const path = require('path')


const server = http.createServer((req, res) =>{
  let filePath = path.join(__dirname, 'public', req.url == "/" ? 'home.html' : req.url);
  if (!path.extname(filePath)) {
    filePath += '.html';
  }
  console.log(filePath);
  fs.readFile(filePath, (err, content) =>{
     if (err){
        fs.readFile(path.join(__dirname, 'public', 'error.html'), (err, data) =>{
            if (err){
                res.writeHead(500, "Error of server");
                res.end("error");
            }
            else{
                res.writeHead(404, "page is not found",{
                    "Content-Type": 'text/html',
                });
                res.end(data);
            }
        })
     }else{
        res.writeHead(200, {
            "Content-Type": 'text/html'
        })
        res.end(content);
     }
  })
})

server.listen(3000, "localhost", ()=>{
    console.log("server has been started");
});