var http = require('http')
var url = require('url')
var fs = require('fs')
var port = 2222

http.createServer(function(req,res) {

    console.log(req.method + " " + req.url)
    var myurl = url.parse(req.url, true).pathname
    
    // landing page
    if (myurl == "/") {
        fs.readFile('./landing_page.html', function(err,data) {
            res.writeHead(200, {'Content-type':'text/html; charset=utf-8'})
            if (err) {res.write("<p> File reading error. </p>")} else {res.write(data)}
            res.end()
        })
    }
    // movie index
    else if (myurl=="/movies") { 
        fs.readFile('./pages/index.html', function(err,data) {
            res.writeHead(200, {'Content-type':'text/html; charset=utf-8'})
            if (err) {res.write("<p> File reading error. </p>")} else {res.write(data)}
            res.end()
        })
    }
    // individual movie page
        /* because of the (bad) condition check, this block of code needs to be last in the 
        if..else chunk (aka immediatly before the bad route handling code). 
        It's not a perfect solution but... its something */
    else if (myurl.includes(".html")) {
        fs.readFile('./pages/movies/' + myurl, function(err,data) {
            res.writeHead(200, {'Content-type':'text/html; charset=utf-8'})
            if (err) {res.write("<p> File reading error. </p>")} else {res.write(data)}
            res.end()
        })
    }
    // bad route handling
    else {
        res.writeHead(200, {'Content-type':'text/html; charset=utf-8'})
        res.end('<p>Rota não suportada: ' + req.url + '</p>')
    }
}).listen(port)

console.log("Listening on " + port)