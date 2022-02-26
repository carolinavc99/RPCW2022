var http = require('http')
var fs = require('fs')
var port = 2222

http.createServer(function(req,res) {
    fs.readFile("./filmes/index.html", function(err,data) {
        res.writeHead(200, {'Content-type':'text/html; charset=utf-8'})
        if (err) {
            res.write("<p> Erro na leitura do ficheiro 1 </p>")
        } 
        else {
            res.write(data)
        }
        res.end()
    })
}).listen(port + 1)


http.createServer(function(req,res) {
    var pagename = req.url.substring(1)

    fs.readFile('./pages/'+ pagename + '.html', function(err,data) {
        res.writeHead(200, {'Content-type':'text/html; charset=utf-8'})
        if (err) {
            res.write("<p> Erro na leitura do ficheiro 2 </p>")
        } 
        else {
            res.write(data)
        }
        res.end()
    })
}).listen(port)

console.log("À escuta em " + port)