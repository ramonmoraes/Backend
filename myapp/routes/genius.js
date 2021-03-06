var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var lista=[];
var lista_ordenada=[];
var db_url='mongodb://localhost:27017/genius';
ler_db();
router.get('/', function(req, res, next) {
res.render('genius', { title: 'Genius!!!', lista:lista}); // renderizando a 'pagina' render passando a variavel title
});
// Fim router.get/

function buble(item){ // primeira coisa a fazer é transformar todos os 'scores' de string para number;

    for (var i = 0; i < item.length; i++) {   // Organizar pelo metodo buble;
          for (var j = 0; j < item.length; j++) { // <--- Conversão de todos os pontos de string para number;
            var aux=parseInt(item[j].pontos);
            if(isNaN(aux)){ // Se for NaN, ou seja, nao havia score quando foi enviado, sera considerado 0;
              aux=0;
            }
            item[j].pontos=aux;
                      }
      var aux = item[i].pontos;
      if(item[i]>item[i+1]){
        aux=item[i+1].pontos;
        item[i+1].pontos=item[i].pontos;
        item[i].pontos=aux;
      }
    }

}


function inserir_db(item){ // OK \/ \/ \/ \/ \/ \/ \/ \/
  mongo.connect(db_url, function(err, db){
    assert.equal(null, err);
    db.collection('ranking').insertOne(item, function(err, res){
      assert.equal(null, err);
      console.log("--- Inserido 1 item no db ---");
      db.close();
    });
  });
}                  // OK /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\

function ler_db(){
  var resultado_array = [];
  mongo.connect(db_url, function(err, db){
    assert.equal(null, err);
    var indicador = db.collection('ranking').find();
    indicador.forEach(function(doc, err){
    assert.equal(null,err);
    resultado_array.push(doc);
    // lista=JSON.stringify(resultado_array);
    lista=resultado_array;
    buble(lista);
    }, function(){
      db.close();
      // console.log("---Foi lida a lista---");
      console.log(lista);
    });
  });
}


// ------------------------------ RANKING \/ \/ \/ \/  OK \/ \/ \/ \/ \/ \/ \/ \/
router.post('/ranking', function(req, res, next) {
    var hash = {
        nome:req.body.nome,
        pontos:req.body.score
    }
    inserir_db(hash);

    res.render('genius', { title: 'Ranking enviado', lista:lista}); // renderizando a 'pagina' render passando a variavel title
}); // Fim router.post/ // OK /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\




module.exports = router; // END
