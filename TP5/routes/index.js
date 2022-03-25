var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get(/^(\/arquivo)$|^(\/)$/, function(req, res, next) {
  axios.get("http://localhost:3000/arquivo")
  .then(response => {
    var dados = response.data
    res.render('arquivo', {arquivo: dados});
  })
  .catch(function(erro) {
    res.render("error", {error: erro});  
  })
});

router.get("/arquivo/id/:id", function(req, res, next) {
  axios.get("http://localhost:3000/arquivo?id=" + req.params.id)
  .then(response => {
    var dados = response.data[0]
    res.render('musica', {musica: dados});
  })
  .catch(function(erro) {
    res.render("error", {error: erro});  
  })
});

router.get("/arquivo/prov/:prov", function(req, res, next) {
  axios.get("http://localhost:3000/arquivo?prov=" + req.params.prov)
  .then(response => {
    var dados = response.data
    res.render('arquivo', {arquivo: dados, flag: "Província"});
  })
  .catch(function(erro) {
    res.render("error", {error: erro});  
  })
});

router.get("/arquivo/local/:local", function(req, res, next) {
  axios.get("http://localhost:3000/arquivo?local=" + req.params.local)
  .then(response => {
    var dados = response.data
    res.render('arquivo', {arquivo: dados, flag: "Localidade"});
  })
  .catch(function(erro) {
    res.render("error", {error: erro});  
  })
});

module.exports = router;