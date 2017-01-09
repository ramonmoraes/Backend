var express = require('express');
var router = express.Router();
var pessoas = [];
var arquivo="E:/Programação/Node/MyFit/myapp/bancodados.js";
function ler(x){
  var fs = require("fs");
      fs.readFile(x, function read(err, data){
        if (err) {
          pessoas :[];
        }else {
          data = JSON.parse(data);
        }
      }
    }

function escrever(x){
    ler(x);
    var fs = require('fs');
    fs.writeFile(x, JSON.stringify(pessoas), function(err){
      if(err){
        console.log("ERROOOOOOOOOOOOOOOOOOOOOOOOOOO NO LER");
    }
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
ler(arquivo);
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

escrever(pessoas);
console.log(pessoas);
  res.render('index', { title: 'Entrou no cadastro' , pessoas:pessoas });
});
/* Cadastro          /\ */
module.exports = router;
