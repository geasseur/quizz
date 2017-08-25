var tabReponses = ["vide", "vide", "vide", "vide"];
var choixReponse;
var positionReponse;
var reponseAleatoire;
var signeQuestion;
var signe;
var colonneSigne; //colonne des signe japonais, sert à la comparaison
var colonneLettre; //colonne des lettres, sert à la comparaison
var listeReponse = document.getElementsByClassName("reponseSigne");
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

//objet sélectionnant quel signe proposer a l'utilisateur, prenant aussi la bonne réponse
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
    nouveauRangement.dispositionLettre();
    nouveauRangement.dispositionBonneReponse(choixReponse);
  }
  console.log(choixReponse);
  console.log(signeQuestion);
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
      positionFausseReponse = Math.floor(Math.random()*(tabReponses.length));
      reponseAleatoire = Math.floor(Math.random()*(tabReponses.length));
      if (tabReponses[positionFausseReponse] == "vide") {
        tabReponses[positionFausseReponse]=signe.japon[reponseAleatoire]["latin"];
      }
      else{
        i--;
      }
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
}

function comparaison(position){
  console.log(listeReponse[position]);
  console.log(positionReponse);
  if (position==positionReponse) {
    alert("gagné");
    avance++;
    for (var i = 0; i < tabReponses.length; i++) {
      tabReponses[i] = "vide";
      listeReponse[i].innerHTML="";
    }
    var nouvelleSelection = new selection(signe);
    nouvelleSelection.selectionSigneJap(signe);
    nouvelleSelection.selectionReponse(signe);
  }
  else{
    alert("perdu");
  }

}
