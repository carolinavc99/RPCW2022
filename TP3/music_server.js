/* 
    DATASET = db.json
    API = json-server -p 3000 .\db.json
*/
var port = 4000
const axios = require('axios');

var http = require('http')
var url = require('url')
var fs = require('fs');

function generate_landing() {
    page = `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>Escola de Música</title>
        </head>
        <body>
            <h2>Escola de Música</h2>

            <h3>Consultar informações</h3>
            <p href="/alunos">Lista de Alunos</p>
            <p href="/cursos">Lista de Cursos</p>
            <p href="/instrumentos">Lista de Instrumentos</p>
        </body>
    </html>`

    return page
}

function generate_alunos(resp) {
    let page = `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>Escola de Música</title>
        </head>
        <body>
            <h3>Teste</h3>
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
        </head>
        <body>
            <h3>Teste</h3>
        <table>
            <tr>
                <th>Id</th>
                <th>Designação</th>
                <th>Duração</th>
                <th>Id Instrumento</th>
                <th>Tipo de Instrumento</th>
            </tr>`
    
    return page
}

function generate_instrumentos(resp) {

}

http.createServer(function(req,res) {
    console.log(req.method + " " + req.url)
    var myurl = url.parse(req.url, true).pathname


    // landing page html --- CHANGE ---
    if (myurl == "/") {
        res.writeHead(200, {'Content-type':'text/html; charset=utf-8'})
        res.write(generate_landing())
        res.end()
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
    // cursos
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
    // instrumentos
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
    // bad route handling
    else {
        res.writeHead(200, {'Content-type':'text/html; charset=utf-8'})
        res.end('<p>Rota não suportada: ' + req.url + '</p>')
    }
}).listen(port)

console.log("Listening on " + port)