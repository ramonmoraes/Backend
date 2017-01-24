var express = require('express');
var router = express.Router();
var lista=[];

router.get('/', function(req, res, next) {

  res.render('genius', { title: 'Genius!!!'}); // renderizando a 'pagina' render passando a variavel title
}); // Fim router.get/





// ------------------------------ RANKING \/ \/ \/ \/
router.post('/ranking', function(req, res, next) {
  function ranking(){
    var pontos = req.body.score;
    lista.push(JSON.stringify(pontos));
    console.log("pontos passsados: " + pontos);
    console.log("------------------");
    console.log(lista);
  }
  var score = ranking();

  res.render('genius', { title: 'Ranking enviado', score:score}); // renderizando a 'pagina' render passando a variavel title
}); // Fim router.post/

function ler(){

}








module.exports = router; // END
