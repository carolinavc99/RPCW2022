/* 
    DATASET = db.json
    API = json-server -p 3000 .\db.json
*/
var port = 4000
const axios = require('axios');

var http = require('http')
var url = require('url')
var fs = require('fs');

function generate_alunos(resp) {
    let page = `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>Escola de Música</title>
            <link rel="stylesheet" href="/style">
        </head>
        <body>
            <h3>Lista de Alunos</h3>
        <table>
            <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Data de Nascimento</th>
                <th>Curso</th>
                <th>Ano de Curso</th>
                <th>Instrumento</th>
            </tr>`
    
    let alunos = resp.data;
    alunos.forEach(p => {
        page += `<tr>
            <td> ${p.id} </td>
            <td> ${p.nome} </td>
            <td> ${p.dataNasc} </td>
            <td> ${p.curso} </td>
            <td> ${p.anoCurso} </td>
            <td> ${p.instrumento} </td>
        </tr>`
    });

    page += `</table>
    </body>
</html>`

    return page
}

function generate_cursos(resp) {
    let page = `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>Escola de Música</title>
            <link rel="stylesheet" href="/style">
        </head>
        <body>
            <h3>Lista de Cursos</h3>
        <table>
            <tr>
                <th>Id</th>
                <th>Designação</th>
                <th>Duração</th>
                <th>Id de Instrumento</th>
                <th>Tipo de Instrumento</th>
            </tr>`

    let cursos = resp.data;
    cursos.forEach(p => {
        page += `<tr>
            <td> ${p.id} </td>
            <td> ${p.designacao} </td>
            <td> ${p.duracao} </td>
            <td> ${p.instrumento.id} </td>
            <td> ${p.instrumento["#text"]} </td>
        </tr>`
    });

    page += `</table>
    </body>
</html>`

    return page
}

function generate_instrumentos(resp) {
    let page = `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>Escola de Música</title>
            <link rel="stylesheet" href="/style">
        </head>
        <body>
            <h3>Lista de Instrumentos</h3>
        <table>
            <tr>
                <th>Id</th>
                <th>Tipo</th>
            </tr>`

    let cursos = resp.data;
    cursos.forEach(p => {
        page += `<tr>
            <td> ${p.id} </td>
            <td> ${p["#text"]} </td>
        </tr>`
    });

    page += `</table>
    </body>
</html>`

    return page
}

http.createServer(function(req,res) {
    console.log(req.method + " " + req.url)
    var myurl = url.parse(req.url, true).pathname

    // landing page html
    if (myurl == "/") {
        fs.readFile('./pages/landing.html', function(err,data) {
            res.writeHead(200, {'Content-type':'text/html; charset=utf-8'})
            if (err) {res.write("<p> File reading error. </p>")} else {res.write(data)}
            res.end()
        })
    }
    // alunos html
    else if (myurl=="/alunos") { 
        res.writeHead(200, {'Content-type':'text/html; charset=utf-8'})
        axios.get('http://localhost:3000/alunos')
            .then( function(resp) {
                res.write(generate_alunos(resp));
                res.end()
            })
        .catch(function(error) {
            console.log(error);
        });
    }
    // cursos html
    else if (myurl=="/cursos") {
        res.writeHead(200, {'Content-type':'text/html; charset=utf-8'})
        axios.get('http://localhost:3000/cursos')
            .then( function(resp) {
                res.write(generate_cursos(resp));
                res.end()
            })
        .catch(function(error) {
            console.log(error);
        });
    }
    // instrumentos html
    else if (myurl=="/instrumentos") {
        res.writeHead(200, {'Content-type':'text/html; charset=utf-8'})
        axios.get('http://localhost:3000/instrumentos')
            .then( function(resp) {
                res.write(generate_instrumentos(resp));
                res.end()
            })
        .catch(function(error) {
            console.log(error);
        });
    }
    else if (myurl=="/style") {
        fs.readFile('./pages/style.css', function(err,data) {
            res.writeHead(200, {'Content-type':'text/css; charset=utf-8'})
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