var tabReponses = ["vide", "vide", "vide", "vide"];
var choixReponse;
var positionReponse;
var reponseAleatoire;
var signeQuestion;
var signe;
var test = 0;
var listeReponse = document.getElementsByClassName("imgReponse");
var avance = 0;

function chargementTableau(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      signe = JSON.parse(this.responseText);
      var nouvelleSelection = new selection(signe);
      nouvelleSelection.selectionLatin(signe);
      nouvelleSelection.selectionReponse(signe);
    }
  }
  xmlhttp.open("GET", "katakana.json", true);
  xmlhttp.send();
}

//objet sélectionnant quel lettre proposer a l'utilisateur, prenant aussi la bonne réponse
function selection(signe){
  this.signe = signe;

  //selection lettre latine
  this.selectionLatin = function (signe){
    signeQuestion = signe.japon[avance]["latin"];
    console.log(signeQuestion);
    var nouveauRangement = new rangementSigne(signeQuestion);
    nouveauRangement.dispositionSigneJap(signeQuestion);
  }
  // sélection de sa réponse
  this.selectionReponse = function(signe){
    choixReponse = signe.japon[avance]["katakana"];
    console.log(choixReponse);
    var nouveauRangement = new rangementSigne(signeQuestion, choixReponse);
    nouveauRangement.dispositionLettre(signeQuestion);
    nouveauRangement.dispositionBonneReponse(choixReponse);
    nouveauRangement.verificationDouble();
  }
}

//objet rangeant dans l'interface l'image et les réponses proposé à l'utilisateur et 3 réponses aléatoire placé dans un tableau
function rangementSigne(signeQuestion, choixReponse){
  this.signeQuestion = signeQuestion;
  this.choixReponse = choixReponse;

  //affiche la lettre latine dans l'interface
  this.dispositionLettre = function(signeQuestion){
    $("#question").append(signeQuestion);
  }
  // remplissage aléatoire de tabReponses
  this.dispositionSigneJap = function(){
    for (let i = 0; i < tabReponses.length; i++) {
      reponseAleatoire = Math.floor(Math.random()*(signe.japon.length));
      tabReponses[i]=signe.japon[reponseAleatoire]["katakana"];
    }
    console.log(tabReponses);
  }

  // bonne réponse rentrée aléatoirement dans le tableau
  this.dispositionBonneReponse = function(choixReponse){
    positionReponse = Math.floor(Math.random()*(5 - 1));
    tabReponses[positionReponse] = choixReponse;
    console.log(tabReponses);

    for (var i = 0; i < tabReponses.length; i++) {
      //console.log(listeReponse[1]);
      $(".imgReponse").eq(i).attr('src',tabReponses[i]);
    }
  }

  // comparaison pour traquer les doublons dans les réponses
  this.verificationDouble = function(){
    //if (test < 10) {
      //test++;
      //console.log(test);
      console.log("entre verification");
      //tabReponses.sort();
      //console.log(tabReponses);
      if (tabReponses[0] == tabReponses[1] || tabReponses[1] == tabReponses[2] || tabReponses[2] == tabReponses[3] || tabReponses[1] == tabReponses[3] || tabReponses[0] == tabReponses[3] || tabReponses[0] == tabReponses[2]){
        console.log("nouveau!!!!!!!!!!!!!");
        relance();
      }
    //}
  }
}

//fonction relançant la sélection des réponses en cas de répétition
function relance(){
  console.log("relance");
  for (var i = 0; i < tabReponses.length; i++) {
    tabReponses[i] = "vide";
  }
  $("#question").empty();
  var nouveauRangement2 = new rangementSigne(signeQuestion);
  nouveauRangement2.dispositionLettre(signeQuestion);
  nouveauRangement2.dispositionSigneJap();
  nouveauRangement2.dispositionBonneReponse(choixReponse);
  nouveauRangement2.verificationDouble();
}


//fonction comparant la position de la réponse donné par l'utilisateur avec celle donné à la réponse par le hasard
function comparaison(position){
  if (position==positionReponse) {
    avance++;
    $("#question").empty();
    for (var i = 0; i < tabReponses.length; i++) {
      tabReponses[i] = "vide";
    }
    var nouvelleSelection = new selection(signe);
    nouvelleSelection.selectionLatin(signe);
    nouvelleSelection.selectionReponse(signe);
  }
  else{
    alert("perdu");
  }

}
