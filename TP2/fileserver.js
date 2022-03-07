var http = require('http')
var url = require('url')
var fs = require('fs')
var port = 2222

http.createServer(function(req,res) {

    console.log(req.method + " " + req.url)
    var myurl = url.parse(req.url, true).pathname
    
    // landing page html
    if (myurl == "/") {
        fs.readFile('./pages/landing_page.html', function(err,data) {
            res.writeHead(200, {'Content-type':'text/html; charset=utf-8'})
            if (err) {res.write("<p> File reading error. </p>")} else {res.write(data)}
            res.end()
        })
    }
    // movie index html
    else if (myurl=="/movies") { 
        fs.readFile('./pages/index.html', function(err,data) {
            res.writeHead(200, {'Content-type':'text/html; charset=utf-8'})
            if (err) {res.write("<p> File reading error. </p>")} else {res.write(data)}
            res.end()
        })
    }
    // lading page css
    else if (myurl == "/landingcss") {
        fs.readFile('./pages/landing.css', function(err,data) {
            res.writeHead(200, {'Content-type':'text/css; charset=utf-8'})
            if (err) {res.write("<p> File reading error. </p>")} else {res.write(data)}
            res.end()
        })
    }
    // movie index css
    else if (myurl == "/indexcss") {
        fs.readFile('./pages/index.css', function(err,data) {
            res.writeHead(200, {'Content-type':'text/css; charset=utf-8'})
            if (err) {res.write("<p> File reading error. </p>")} else {res.write(data)}
            res.end()
        })
    }
    // individual movie page css
    else if (myurl == "/moviecss") {
        fs.readFile('./pages/movie.css', function(err,data) {
            res.writeHead(200, {'Content-type':'text/css; charset=utf-8'})
            if (err) {res.write("<p> File reading error. </p>")} else {res.write(data)}
            res.end()
        })
    }
    // individual movie page html
    else if (myurl.includes("_movie.html")) {
        fs.readFile('./pages/movies/' + myurl, function(err,data) {
            res.writeHead(200, {'Content-type':'text/html; charset=utf-8'})
            if (err) {res.write("<p> File reading error. </p>")} else {res.write(data)}
            res.end()
        })
    }
    // individual actor page css
    else if (myurl == "/typecss") {
        fs.readFile('./pages/type.css', function(err,data) {
            res.writeHead(200, {'Content-type':'text/css; charset=utf-8'})
            if (err) {res.write("<p> File reading error. </p>")} else {res.write(data)}
            res.end()
        })
    }
    // individual actor page html
    else if (myurl.includes("_cast.html")) {
        fs.readFile('./pages/actors/' + myurl, function(err,data) {
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