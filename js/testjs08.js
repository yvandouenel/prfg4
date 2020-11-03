/**
 Création d'une fonction constructeur d'objet "Card"
 */
function Card(q, a, e) {// paramètres
  // Déclaration et affectation des propriétés
  this.question = q;
  this.answer = a;
  this.explanation = e;

  // Méthodes
  this.moveRight = function() {
    // code pour déplacer la carte
    console.log('Quand je serai grand, je ferai une méthode qui déplace la carte vers la droite');
  }
  this.moveLeft = function() {
    // code pour déplacer la carte
    console.log('Quand je serai grand, je ferai une méthode qui déplace la carte vers la gauche');
  }
  this.afficherCarteComplete = function(){
    console.log('Question = ' + this.question);
    console.log('Réponse = ' + this.answer);
    console.log('Explication = ' + this.explanation);
  }
}
// instance créée avec des arguments
let tbl = new Card("Inventeur du web ?", "Tim Berners-lee", "Anglais qui travaillait au CERN."); 

// Invocation ou appel de la méthode afficherCarteComplete
tbl.afficherCarteComplete();

// Appel de la méthode moveLeft
tbl.moveLeft();