var tabReponses = ["vide", "vide", "vide", "vide"];
var choixReponse;
var signeQuestion;
var signe;
var colonneSigne; //colonne des signe japonais, sert à la comparaison
var colonneLettre; //colonne des lettres, sert à la comparaison
var listeReponse = document.getElementsByClassName("signe");
var avance = 0;

function chargementTableau(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      signe = JSON.parse(this.responseText);
      console.log(signe);
      console.log(signe.japon[avance]["hiragana"]);
      var nouvelleSelection = new selection(signe);
      nouvelleSelection.selectionSigneJap(signe);
      nouvelleSelection.selectionReponse(signe);
    }
  }
  xmlhttp.open("GET", "signe.json", true);
  xmlhttp.send();
}

//objet sélectionnant quel signe proposer a l'utilisateur, prenant aussi la bonne réponse et 3 réponses aléatoire placé dans un tableau
function selection(signe){
  this.signe = signe;
  this.selectionSigneJap = function (signe){
    signeQuestion = signe.japon[avance]["hiragana"];
    console.log(signeQuestion);
    var nouveauRangement = new rangementSigne(signeQuestion);
    nouveauRangement.dispositionSigneJap(signeQuestion);
  }
  this.selectionReponse = function(signe){
    choixReponse = signe.japon[avance]["latin"];
    console.log(choixReponse);
    var nouveauRangement = new rangementSigne(signeQuestion);
    nouveauRangement.dispositionLettre(choixReponse);
  }
  console.log(choixReponse);
  console.log(signeQuestion);
  console.log(signe);
}

//objet rangeant dans l'interface l'image et les réponses proposé à l'utilisateur
function rangementSigne(signeQuestion, choixReponse){
  this.signeQuestion = signeQuestion;
  this.choixReponse = choixReponse;

  this.dispositionSigneJap = function(signeQuestion){
    console.log(signeQuestion);
    $("#imgQuestion").attr('src', signeQuestion);
    /*var positionReponse = Math.floor(Math.random()*(4 - 1)+1);
    tabReponses[positionReponse] = choixReponse;
    console.log(tabReponses);*/
  }
  this.dispositionLettre = function(choixReponse){
    var positionReponse = Math.floor(Math.random()*(4 - 1)+1);
    tabReponses[positionReponse] = choixReponse;
    console.log(tabReponses);
    console.log(signe);
  }
}

function comparaison(){


}
