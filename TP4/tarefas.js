var http = require('http')
var axios = require('axios')
var fs = require('fs')
var static = require('./static.js')

var {parse} = require('querystring')

function recuperaInfo(request, callback) {
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded') {
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', () => {
            console.log(body)
            callback(parse(body))
        })
    }
}

function geraPostConfirm(tarefa, d){
    return `
    <html>
    <head>
        <title>POST receipt: ${tarefa.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="/favicon.ico"/>
        <link rel="stylesheet" href="/tarefas.css"/>
    </head>
    <body>
        <h2 class="">Tarefa ${tarefa.id}: "${tarefa.desc}" inserida</h2>

        <footer>
            <address>Gerado por galuno::RPCW2022 em ${d} - [<a href="/">Voltar</a>]</address>
        </footer>
    </div>
</body>
</html>
    `
}

// Lista de Tarefas
function geraPagina( tarefas, d){
  let pagHTML = `
    <html>
        <head>
            <title>Lista de tarefas</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="/tarefas.css"/>
            <link rel="icon" href="/favicon.ico"/>
        </head>
        <body>
            <h2>Lista de Tarefas</h2>

            <form action="/tarefas" method="POST">
                <label><b>Descrição</b></label>
                <input type="text" name="desc">

                <label for="status"><b>Status:</b></label>
                <select id="status" name="status">
                  <option value="TODO">TODO</option>
                  <option value="DONE">DONE</option>
                </select> 
          
                <input type="submit" value="Registar"/>
                <input type="reset" value="Limpar"/> 
            </form>
            <div class="listas">
            `
    let done = `<div class = "lista">
                    <h3>DONE</h3>
                    <table>`
    let todo = `<div class = "lista">
                    <h3>TODO</h3>
                    <table>`
    tarefas.forEach( t => {
        if (t.status == "DONE") {
            done += `
                <tr>
                    <td>${t.desc}</td>
                </tr>
            `
        }
        else {
            todo += `
            <tr>
                <td>
                    <a class="check" href="/tarefas/${t.id}/toDONE">☑</a>
                    ${t.desc}
                </td>
            </tr>
        `
        }
    })

    done += "</table></div>"
    todo += "</table></div>"
    pagHTML += todo 
    pagHTML += done 
    pagHTML += 
        `</div>
        <div class="footer">
            <address>Gerado por tarefas::RPCW2022 em ${d}</address>
        </div>
    </body>
</html>`
  return pagHTML
}

// Server
var tarefaServer = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substring(0, 16) // extrair data e hora
    console.log(req.method + " " + req.url + " " + d)

    // Tratamento do pedido
    if (static.recursoEstatico(req)) {
        static.sirvoRecursoEstatico(req, res)
        return
    }

    switch(req.method){
        case "GET": 
            // GET /tarefas --------------------------------------------------------------------
            if((req.url == "/") || (req.url == "/tarefas")){
                axios.get("http://localhost:3000/tarefas")
                    .then(response => {
                        var tarefas = response.data
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(geraPagina(tarefas, d))
                        res.end()
                    })
                    .catch( erro => {
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de tarefas</p>")
                        res.end()
                    })
            }
            else if (req.url.includes("toDONE")) {
                let id = req.url.split("/")[2]
                let info = ""
                axios.get(`http://localhost:3000/tarefas/${id}`)
                    .then(response => {
                        info = response.data
                    }).then( put =>
                        axios.put(`http://localhost:3000/tarefas/${info.id}`, {
                            status:"DONE",
                            desc: info.desc
                        })
                        .then(resp => {
                            res.writeHead(200, {'Content-type':'text/html;charset=utf-8'})
                            res.write("<p>Feito</p>");
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(200, {'Content-type':'text/html;charset=utf-8'})
                            res.write('<p>Erro no PUT: ' + erro + '</p>')
                            res.write('<p><a href="/">Voltar</a></p>')
                            res.end()                    
                        })
                    ).catch(erro => {
                        res.writeHead(200, {'Content-type':'text/html;charset=utf-8'})
                        res.write('<p>Erro no PUT: ' + erro + '</p>')
                        res.write('<p><a href="/">Voltar</a></p>')
                        res.end()                    
                    })

                
            }
            else {
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                res.end()
            }
            break
        case "POST":
            if(req.url == "/tarefas"){
                recuperaInfo(req, resultado => {
                    console.log('POST de aluno:' + JSON.stringify(resultado))
                    axios.post('http://localhost:3000/tarefas', resultado)
                    .then(resp => {
                        res.write(geraPostConfirm(resp.data, d));
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(200, {'Content-type':'text/html;charset=utf-8'})
                        res.write('<p>Erro no POST: ' + erro + '</p>')
                        res.write('<p><a href="/">Voltar</a></p>')
                        res.end()
                    })
                })
            }
            else {
                res.writeHead(200, {'Content-type':'text/html;charset=utf-8'})
                res.write('<p>Recebi um POST não suportado.</p>')
                res.write('<p><a href="/">Voltar</a></p>')
                res.end()
            }
            break
        default: 
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>" + req.method + " não suportado neste serviço.</p>")
            res.end()
    }
})

tarefaServer.listen(7777)
console.log('Servidor à escuta na porta 7777...')