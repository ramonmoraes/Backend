var express = require('express');
var router = express.Router();
var pessoas = [];
var arquivo="E:/Programação/Node/MyFit/myapp/bancodados.js";
var achei =[];

var ler_arquivo = function(callback){
  var fs = require("fs");
  fs.readFile(arquivo, callback);
}

var escrever_arquivo = function(hash){
  var fs = require("fs");

  pessoas.push(hash); //Nao adiantou nada, se der F5 no /cadastro logo apos upar o server, o banco sera overwritten;
  fs.writeFile(arquivo, JSON.stringify(pessoas), function(err){
  if(err){
      console.log("err");
        }
      });
}

/* GET home page. */
router.get('/', function(req, res, next) {

ler_arquivo(function read(err, data){
      if (err) {
        console.log("Não ta lendo");
        res.render('index', { title: 'Express' , pessoas:[] });
        return;
      }else{
        pessoas=JSON.parse(data);
        res.render('index', { title: 'Express' , pessoas:pessoas, achei:achei });
      }
    })

});

/* Cadastro          \/ */
router.post('/cadastro', function(req, res, next) {
if((req.body.firstname=='')||(req.body.lastname=='')){
  return false;
}else{
var hash = {
    nome: req.body.firstname,
    sobrenome: req.body.lastname
       }
}

escrever_arquivo(hash);
res.render('index', { title: 'Entrou no cadastro' , pessoas:pessoas, achei:achei });
});
/* Cadastro          /\ */

// Pesquisar  \/
router.get('/procurar', function(req, res, next){
ler_arquivo(function read(err, data){
      achei=[];
      if (err) {
        window.alert("há?") // isso pode? <-- achoqn
      }else{
        var dado_lido = JSON.parse(data);
        for (var i = 0; i < dado_lido.length; i++) {
          if(req.query.procurar.toLowerCase()==dado_lido[i].nome.toLowerCase()){
            achei.push(dado_lido[i]);
          }
        }
        res.render('index', { title: 'Entrou na Pesquisa' , pessoas:pessoas, achei:achei});
      }
      console.log(achei);
    });

  });
// Pesquisar /\
module.exports = router;
