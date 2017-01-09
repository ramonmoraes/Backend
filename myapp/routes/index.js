var express = require('express');
var router = express.Router();
var pessoas = [];
var arquivo="E:/Programação/Node/MyFit/myapp/bancodados.js";
var aux;

/* GET home page. */
router.get('/', function(req, res, next) {

    var fs = require("fs");
    fs.readFile(arquivo, function read(err, data){
      if (err) {
        pessoas :[];
      }else{
        pessoas=JSON.parse(data);
      }
    })
    res.render('index', { title: 'Express' , pessoas:pessoas });
});

/* Cadastro          \/ */
router.post('/cadastro', function(req, res, next) {
if((req.body.firstname=='')||(req.body.lastname=='')){
  return false;
}else{
data = {
    nome: req.body.firstname,
    sobrenome: req.body.lastname
}
}

pessoas.push(data);

var fs = require('fs');
fs.writeFile(arquivo, JSON.stringify(pessoas), function(err){
if(err){
    console.log("err");
      }
});

console.log(pessoas);
  res.render('index', { title: 'Entrou no cadastro' , pessoas:pessoas });
});
/* Cadastro          /\ */
module.exports = router;
