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

function ordenar_lista(item){
  for(var i=0; i<item.length; i++){
    if(item[i].pontos<item[i+1].pontos){
      var aux = item[i+1];
      item[i+1]=item[i];
      item[i]=aux;
    }
  }
  for(var i=0; i<item.length; i++){
    console.log(item[i]);
  }
  return item;
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
      // lista_ordenada=ordenar_lista(lista);

    }, function(){
      db.close();
      console.log("---Foi lida a lista---");
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
