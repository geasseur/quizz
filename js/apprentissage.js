var signe = [["a", "img/hiragana/a.jpg"],
["i","img/hiragana/i.jpg"],
["e","img/hiragana/e.jpeg"],
["u","img/hiragana/u.jpg"],
["o","img/hiragana/o.jpg"]];
var reponse = ["vide", "vide", "vide", "vide"];
var positionReponse;

var pointUtilisateur = 0;

function demarrer(){
  $("#imgQuestion").attr('src',signe[0][1]);
  //var sourceQuestion = document.getElementById("imgQuestion");
  //sourceQuestion.src = signe[0][1];
  console.log(signe[0][1]);
  positionReponse = Math.floor(Math.random()*(5 - 1)+1);
  console.log(positionReponse);
  $(".signe").append("<h2>"+signe[0][0]+"</h2>");
}
demarrer();
