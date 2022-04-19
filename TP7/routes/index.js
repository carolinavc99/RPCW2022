var express = require('express');
var router = express.Router();
var axios = require("axios");
var apikey = "apikey=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGNiYTg0OWJhYmI2NjdjYmZkYzE2ZSIsImlhdCI6MTY0OTE5NTY1MiwiZXhwIjoxNjUxNzg3NjUyfQ.EuvH713Qr6IZ073-5FMF6j5p_3tb6Trv0TOOF5ZHWOPUlCBqKU1H9DTo_ueoCyWhPbEd6F8xzNvn-UkG3J8Ppq65xF8uukoElnSIsi3kldXI2E_EHMv5ETIq-2SGpiBmLyv1zu2broi-nXw18XwKM-WWpoumw5mZacg1qyj4kokGm--WzPIDD15Uibu2ObsDfeHpbDt81Npq-WgEVe56F5w0TdAvY_b-Xvm77hXI4MuaatL9bsOtYEyiepLuBelDyVWjAIoon3-7tB1lwrPnC0OJ_cxKUyCdqx8sZPkmciyTmBsV8fDTyvTP1ibiryAQsDRK5TrG83CcWmStZyDnoQ"
var date = new Date().toISOString().substring(0, 10)
var visited = ['/']

router.get('*', (req, res, next) => {
  if (req.url != "/voltar" && req.url != "/favicon.ico") {
    visited.push(req.url)
  }
  next()
});

/* GET home page. */
router.get('/', function(req, res) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&' + apikey)
    .then(resp => {
      var dados = resp.data;
      res.render('index', { data: dados , title: "Index", date: date});
    })
    .catch(error => {
      res.render('error', { error: error });
    });  
});

router.get(/\/classes\/[0-9\.]+/, function(req, res) {
  var id = req.url.split("/")[2]
  axios.get('http://clav-api.di.uminho.pt/v2/classes/c' + id + "?" + apikey)
    .then(resp => {
      var dados = resp.data;

      axios.get('http://clav-api.di.uminho.pt/v2/classes/c' + id + "/procRel" + "?" + apikey)
         .then (resp2 => {
          var procRel = []
          resp2.data.forEach( p => {
            if (p.idRel == "eCruzadoCom" || p.idRel == "eComplementarDe" || p.idRel == "eSuplementoDe" || p.idRel == "eSuplementoPara") {
              procRel.push(p)
            }
          })
          res.render('classe', { data: dados , title: "Classe", processosRelacionados: procRel, date: date});
         })
    })
    .catch(error => {
      res.render('error', { error: error, title: "Error" , message: "Error"});
    });
});

router.get("/voltar", function(req, res) {
  visited.pop() // without this pop it goes back to itself
  var lastvisited = visited.pop()
  res.redirect(lastvisited)
});

module.exports = router;
