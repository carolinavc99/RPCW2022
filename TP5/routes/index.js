var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get("/", function(req, res, next) {
  res.redirect("/arquivo")
  .catch(function(erro) {
    res.render("error", {error: erro, title: "Erro"});  
  })
});

router.get("/arquivo", function(req, res, next) {
  axios.get("http://localhost:3000/arquivo")
  .then(response => {
    var dados = response.data
    res.render('arquivo', {arquivo: dados, title: "Arquivo Sonoro"});
  })
  .catch(function(erro) {
    res.render("error", {error: erro, title: "Erro"});  
  })
});

router.get("/arquivo/id/:id", function(req, res, next) {
  axios.get("http://localhost:3000/arquivo?id=" + req.params.id)
  .then(response => {
    var dados = response.data[0]
    res.render('musica', {musica: dados, title: "Página Individual"});
  })
  .catch(function(erro) {
    res.render("error", {error: erro, title: "Erro"});  
  })
});

router.get("/arquivo/prov/:prov", function(req, res, next) {
  axios.get("http://localhost:3000/arquivo?prov=" + req.params.prov)
  .then(response => {
    var dados = response.data
    res.render('arquivo', {arquivo: dados, flag: "Província", title: "Arquivo Sonoro"});
  })
  .catch(function(erro) {
    res.render("error", {error: erro, title: "Erro"});  
  })
});

router.get("/arquivo/local/:local", function(req, res, next) {
  axios.get("http://localhost:3000/arquivo?local=" + req.params.local)
  .then(response => {
    var dados = response.data
    res.render('arquivo', {arquivo: dados, flag: "Localidade", title: "Arquivo Sonoro"});
  })
  .catch(function(erro) {
    res.render("error", {error: erro, title: "Erro"});  
  })
});

router.get("/arquivo/instrumento/:instrumento", function(req, res, next) {
  axios.get("http://localhost:3000/arquivo?instrumento=" + req.params.instrumento)
  .then(response => {
    var dados = response.data
    res.render('arquivo', {arquivo: dados, flag: "Instrumento", title: "Arquivo Sonoro"});
  })
  .catch(function(erro) {
    res.render("error", {error: erro, title: "Erro"});  
  })
});

router.get("/arquivo/musico/:musico", function(req, res, next) {
  axios.get("http://localhost:3000/arquivo?musico=" + req.params.musico)
  .then(response => {
    var dados = response.data
    res.render('arquivo', {arquivo: dados, flag: "Músico", title: "Arquivo Sonoro"});
  })
  .catch(function(erro) {
    res.render("error", {error: erro, title: "Erro"});  
  })
});

/*router.get("/arquivo/inserir", function(req, res, next) {
  res.render("inserir", {title:"Arquivo Sonoro"});
});

router.post("/arquivo/inserir", function(req, res, next) {
  var dados = req.data
  console.log("dados -> ")
  console.log( dados)
  var fich = dados['ficheiros'].split(";")
  fich.forEach(el => {
    el = el.split(",")
    if (el[1]) {
      dados['obsFiles'] += {"file" : el[0], "fileType" : el[1]}
    }
  });
  axios.post("http://localhost:3000/arquivo", {
    duracao : dados['duracao'],
    file : dados['file'],
    fileType : dados['fileType'],
    instrumento : dados['instrumento'],
    local : dados['local'],
    musico : dados['musico'],
    obs : dados['obs'],
    obsFiles : dados['obsFiles'],
    prov : dados['prov'],
    tit : dados['tit']
  })
  .then( res =>{
    res.redirect("/arquivo");
  })
  .catch(function(erro) {
    res.render("error", {error: erro, title: "Erro"});  
  })
});
*/
module.exports = router;