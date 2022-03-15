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
            <div class="links">
                <a class="border" href="/alunos">Alunos</a>
                <a class="border" href="/cursos">Cursos</a>
                <a class="border" href="/instrumentos">Instrumentos</a>
            </div>
            <h3>Lista de Alunos</h3>
        <table>
            <tr>
                <th>Id<a class="arrow" href="/alunos?_sort=id&_order=asc">&#8593</a> <a class="arrow" href="/alunos?_sort=id&_order=desc">&#8595</a></th>
                <th>Nome<a class="arrow" href="/alunos?_sort=nome&_order=asc">&#8593</a> <a class="arrow" href="/alunos?_sort=nome&_order=desc">&#8595</a></th>
                <th>Data de Nascimento<a class="arrow" href="/alunos?_sort=dataNasc&_order=asc">&#8593</a> <a class="arrow" href="/alunos?_sort=dataNasc&_order=desc">&#8595</a></th>
                <th>Curso<a class="arrow" href="/alunos?_sort=curso&_order=asc">&#8593</a> <a class="arrow" href="/alunos?_sort=curso&_order=desc">&#8595</a></th>
                <th>Ano de Curso<a class="arrow" href="/alunos?_sort=anoCurso&_order=asc">&#8593</a> <a class="arrow" href="/alunos?_sort=anoCurso&_order=desc">&#8595</a></th>
                <th>Instrumento<a class="arrow" href="/alunos?_sort=isntrumento&_order=asc">&#8593</a> <a class="arrow" href="/alunos?_sort=isntrumento&_order=desc">&#8595</a></th>
            </tr>`
    
    let alunos = resp.data;
    alunos.forEach(p => {
        page += `<tr>
            <td><a href="/alunos?id=${p.id}"> ${p.id}</a> </td>
            <td><a href="/alunos?nome=${p.nome}"> ${p.nome}</a> </td>
            <td><a href="/alunos?dataNasc=${p.dataNasc}"> ${p.dataNasc}</a> </td>
            <td><a href="/alunos?curso=${p.curso}"> ${p.curso}</a> </td>
            <td><a href="/alunos?anoCurso=${p.anoCurso}"> ${p.anoCurso}</a> </td>
            <td><a href="/alunos?instrumento=${p.instrumento}"> ${p.instrumento}</a> </td>
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
            <div class="links">
                <a class="border" href="/alunos">Alunos</a>
                <a class="border" href="/cursos">Cursos</a>
                <a class="border" href="/instrumentos">Instrumentos</a>
            </div>
            <h3>Lista de Cursos</h3>
        <table>
            <tr>
                <th>Id<a href="/cursos?_sort=id&_order=asc">&#8593</a> <a href="/cursos?_sort=id&_order=desc">&#8595</a></th>
                <th>Designação<a href="/cursos?_sort=designacao&_order=asc">&#8593</a> <a href="/cursos?_sort=designacao&_order=desc">&#8595</a></th>
                <th>Duração<a href="/cursos?_sort=duracao&_order=asc">&#8593</a> <a href="/cursos?_sort=duracao&_order=desc">&#8595</a></th>
                <th>Id de Instrumento<a href="/cursos?_sort=instrumento.id&_order=asc">&#8593</a> <a href="/cursos?_sort=instrumento.id&_order=desc">&#8595</a></th>
                <th>Tipo de Instrumento</th>
            </tr>`

    let cursos = resp.data;
    cursos.forEach(p => {
        page += `<tr>
            <td><a href="/cursos?id=${p.id}"</a>${p.id} </td>
            <td><a href="/cursos?designacao=${p.designacao}"</a>${p.designacao} </td>
            <td><a href="/cursos?duracao=${p.duracao}"</a>${p.duracao} </td>
            <td><a href="/cursos?instrumento.id=${p.instrumento.id}"</a>${p.instrumento.id} </td>
            <td>${p.instrumento["#text"]} </td>
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
            <div class="links">
                <a class="border" href="/alunos">Alunos</a>
                <a class="border" href="/cursos">Cursos</a>
                <a class="border" href="/instrumentos">Instrumentos</a>
            </div>
            <h3>Lista de Instrumentos</h3>
        <table>
            <tr>
                <th>Id<a href="/instrumentos?_sort=id&_order=asc">&#8593</a> <a href="/instrumentos?_sort=id&_order=desc">&#8595</a></th>
                <th>Tipo</th>
            </tr>`

    let cursos = resp.data;
    cursos.forEach(p => {
        page += `<tr>
            <td><a href="/instrumentos/?id=${p.id}"> ${p.id}</a></td>
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
    var myurl = url.parse(req.url, true).path

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
    else if (myurl.includes("alunos?")) {
        res.writeHead(200, {'Content-type':'text/html; charset=utf-8'})
        axios.get('http://localhost:3000' + myurl)
            .then( function(resp) {
                res.write(generate_alunos(resp));
                res.end()
            })
        .catch(function(error) {
            console.log(error);
        });
    }
    else if (myurl.includes("cursos?")) {
        res.writeHead(200, {'Content-type':'text/html; charset=utf-8'})
        axios.get('http://localhost:3000' + myurl)
            .then( function(resp) {
                res.write(generate_cursos(resp));
                res.end()
            })
        .catch(function(error) {
            console.log(error);
        });
    }
    else if (myurl.includes("instrumentos?")) {
        res.writeHead(200, {'Content-type':'text/html; charset=utf-8'})
        axios.get('http://localhost:3000' + myurl)
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