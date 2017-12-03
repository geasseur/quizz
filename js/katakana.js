var tabReponses = ["vide", "vide", "vide", "vide"];
var choixReponse;
var positionReponse;
var reponseAleatoire;
var signeQuestion;
var signe;
var listeReponse = document.getElementsByClassName("reponseSigne");
var avance = 0;

function chargementTableau(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      signe = JSON.parse(this.responseText);
      console.log(signe);
      console.log(signe.japon[avance]["katakana"]);
      var nouvelleSelection = new selection(signe);
      nouvelleSelection.selectionSigneJap(signe);
      nouvelleSelection.selectionReponse(signe);
    }
  }
  xmlhttp.open("GET", "katakana.json", true);
  xmlhttp.send();
}

//objet sélectionnant quel signe proposer a l'utilisateur, prenant aussi la bonne réponse
function selection(signe){
  this.signe = signe;

  this.selectionSigneJap = function (signe){
    signeQuestion = signe.japon[avance]["katakana"];
    console.log(signeQuestion);
    var nouveauRangement = new rangementSigne(signeQuestion);
    nouveauRangement.dispositionSigneJap(signeQuestion);
  }
  this.selectionReponse = function(signe){
    choixReponse = signe.japon[avance]["latin"];
    console.log(choixReponse);
    var nouveauRangement = new rangementSigne(signeQuestion, choixReponse);
    nouveauRangement.dispositionLettre();
    nouveauRangement.dispositionBonneReponse(choixReponse);
    nouveauRangement.verificationDouble();
  }
  console.log(signe);
}

//objet rangeant dans l'interface l'image et les réponses proposé à l'utilisateur et 3 réponses aléatoire placé dans un tableau
function rangementSigne(signeQuestion, choixReponse){
  this.signeQuestion = signeQuestion;
  this.choixReponse = choixReponse;

  this.dispositionSigneJap = function(signeQuestion){
    console.log(signeQuestion);
    $("#imgQuestion").attr('src', signeQuestion);
  }
  this.dispositionLettre = function(){
    for (let i = 0; i < tabReponses.length; i++) {
      console.log(signe.japon.length);
      reponseAleatoire = Math.floor(Math.random()*(signe.japon.length));
      console.log(reponseAleatoire);
      tabReponses[i]=signe.japon[reponseAleatoire]["latin"];
      console.log(tabReponses);
    }

  }
  this.dispositionBonneReponse = function(choixReponse){
    positionReponse = Math.floor(Math.random()*(5 - 1));
    console.log(positionReponse);
    tabReponses[positionReponse] = choixReponse;
    console.log(tabReponses);
    for (var i = 0; i < tabReponses.length; i++) {
      listeReponse[i].append(tabReponses[i]);
    }
  }
  this.verificationDouble = function(){
    console.log("entre verification");
    tabReponses.sort();
    console.log(tabReponses);
    if (tabReponses[0] == tabReponses[1] || tabReponses[1] == tabReponses[2] || tabReponses[2] == tabReponses[3]){
      console.log("nouveau!!!!!!!!!!!!!");
      relance();
    }
  }
}

//fonction relançant la sélection des réponses en cas de répétition
function relance(){
  console.log("relance");
  for (var i = 0; i < tabReponses.length; i++) {
    tabReponses[i] = "vide";
    listeReponse[i].innerHTML="";
  }
  var nouveauRangement2 = new rangementSigne(signeQuestion);
  nouveauRangement2.dispositionLettre();
  nouveauRangement2.dispositionBonneReponse(choixReponse);
  nouveauRangement2.verificationDouble();
}


//fonction comparant la position de la réponse donné par l'utilisateur avec celle donné à la réponse par le hasard
function comparaison(position){
  console.log(listeReponse[position]);
  console.log(positionReponse);
  if (position==positionReponse) {
    avance++;
    for (var i = 0; i < tabReponses.length; i++) {
      tabReponses[i] = "vide";
      listeReponse[i].innerHTML="";
    }
    var nouvelleSelection = new selection(signe);
    nouvelleSelection.selectionSigneJap(signe);
    nouvelleSelection.selectionReponse(signe);
  }
  else if (avance == signe.length) {
    alert('terminé');
  }
  else{
    alert("perdu");
  }

}
