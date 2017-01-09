function validar(){
  var nome = document.getElementById('firstname').value;
  var lastnome = document.getElementById('lastname').value;
  if(nome==''){
    getElementById('firstname').focus();
    return false;
  }
  if(lastnome==''){
    getElementById('lastname').focus();
    return false;
  }
  return true;
  }
