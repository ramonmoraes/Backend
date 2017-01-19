var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {

  res.render('genius', { title: 'Genius!!!'}); // renderizando a 'pagina' render passando a variavel title
}); // Fim router.get/


router.get('/genius/ranking', function(req, res, next) {


  res.render('genius', { title: 'Ranking enviado'}); // renderizando a 'pagina' render passando a variavel title
}); // Fim router.post/






function ranking(){
  var pontos = req.body.pontos;
  console.log("pontos passsados:" + pontos);
}










module.exports = router; // END
