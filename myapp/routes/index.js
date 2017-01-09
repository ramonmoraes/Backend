var express = require('express');
var router = express.Router();
var pessoas = [];
var arquivo="E:/Programação/Node/MyFit/myapp/bancodados.js";

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
        console.log("nao ta lendo essa merda");
        res.render('index', { title: 'Express' , pessoas:[] });
        return;
      }else{
        pessoas=JSON.parse(data);
        res.render('index', { title: 'Express' , pessoas:pessoas });
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
res.render('index', { title: 'Entrou no cadastro' , pessoas:pessoas });
});
/* Cadastro          /\ */
module.exports = router;
