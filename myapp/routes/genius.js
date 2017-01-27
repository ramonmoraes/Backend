var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var lista=[];
var lista_ordenada=[];
var db_url='mongodb://localhost:27017/genius';

router.get('/', function(req, res, next) {
  ler_db();
  res.render('genius', { title: 'Genius!!!', lista:lista}); // renderizando a 'pagina' render passando a variavel title
});
// Fim router.get/
// function ordenar_lista(item){
//   var aux={
//     nome:'',
//     pontos:0
//   }
//   for(var i=0; i<item.length; i++){
//     if(item[i].pontos<item[i+1].pontos){
//       aux = item[i+1];
//       item[i+1]=item[i];
//       item[i]=aux;
//     }
//   }
//   return item;
// }

function inserir_db(item){
  mongo.connect(db_url, function(err, db){
    assert.equal(null, err);
    db.collection('ranking').insertOne(item, function(err, res){
      assert.equal(null, err);
      console.log("--- Inserido 1 item no db ---");
      db.close();
    });
  });
}

function ler_db(){
  var resultado_array = [];
  mongo.connect(db_url, function(err, db){
    assert.equal(null, err);
    var indicador = db.collection('ranking').find();
    indicador.forEach(function(doc, err){
      assert.equal(null,err);
      resultado_array.push(doc);
      //  lista=JSON.stringify(resultado_array);
      lista=resultado_array;
      // lista_ordenada=ordenar_lista(lista);

    }, function(){
      db.close();
      console.log("---Foi lida a lista---");
    });
  });
}


// ------------------------------ RANKING \/ \/ \/ \/
router.post('/ranking', function(req, res, next) {
    var hash = {
        nome:req.body.nome,
        pontos:req.body.score
    }
    inserir_db(hash);

    res.render('genius', { title: 'Ranking enviado', lista:lista}); // renderizando a 'pagina' render passando a variavel title
}); // Fim router.post/




module.exports = router; // END
