var tempo=3;
var sequencia_usuario=[];
var sequencia_gerada =[];
var ale;
var i=0;
var count=0;
var correct = new Audio('./sound/glass.mp3');
var incorrect = new Audio('./sound/incorrect.mp3');
var t=0;
var loro;

function zerar(){
setTimeout(function(){
  tempo=3;
  i=0;
  count=0;
}
,300)}

function audio(a){
  a.pause();
  a.currentTime = 0;
  a.play();
}


 function mostrar(){
   i=0;
   var toca = setInterval(function(){
   loro = sequencia_gerada[i];
   animacao(loro);
   i++;
   if(i==sequencia_gerada.length){
     clearInterval(toca);
     return true;

   }
},1000);

}

function animacao(a){
  document.getElementsByClassName('botao')[a-1].style.transform='scale(1.1)';
  audio(correct);
    setTimeout(function(){
      document.getElementsByClassName('botao')[a-1].style.transform='scale(1.0)'
    }, 350);
}

function comecarjogo(){

  sequencia_gerada=[];
  sequencia_usuario=[];

  console.log("PLAY");
    for(i = 0; i < tempo; i++){
    ale = Math.floor((Math.random() * 4) + 1);
    sequencia_gerada.push(ale);//Gerar um numero de 1 a 4, ou seja, no tempo i, ele acenderá o a cor de posição 4
                              }
    i=0;
    t=0; // Pra usar em outras funcoes
      mostrar();
}


function inserir(n){
  animacao(n);
  document.getElementById("pontos").innerHTML = tempo*tempo-3+count; // Mostrar SCORE
  document.getElementById("score").value = tempo*tempo-3+count; // Score Server
  setTimeout(sequencia_usuario.push(n),150);
        if(sequencia_usuario[t]==sequencia_gerada[t]){
          audio(correct);
          count++;
          t++;

        } else {
        audio(incorrect);
        console.log("perdeu");
        zerar();
        sequencia_gerada=[];
        sequencia_usuario=[];
        return 0;
            }
            if(count==tempo){
              console.log("ganhou");
              tempo+=1;
              count=0;
              setTimeout(comecarjogo(),1000);
                            }


}
