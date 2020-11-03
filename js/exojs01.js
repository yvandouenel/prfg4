/* Fonction constructeur */
/* function Cercle(rayon, nom) {

  // propriétés
  this.rayon = rayon;
  this.nom = nom;
  console.log(this.nom, this);
}
Cercle.prototype.pi = 3.14;
Cercle.prototype.aire = function() {
  console.log(`Aire de ${this.nom} : ${this.pi * this.rayon * this.rayon} m²` );
  //console.log("Aire de " + this.nom + " : " + (this.pi * this.rayon * this.rayon));
}
// Instanciation 
let petit_cercle = new Cercle(2, "Petit cercle");
// Appel de méthode
petit_cercle.aire();
// Instanciation 
let grand_cercle = new Cercle(4, "Grand cercle");
// Appel de méthode
grand_cercle.aire(); */
/**
 * La class cercle permet de gérer la fonction constructor qui 
 * sera appelée à chaque instanciation (new). Les proprités directes et 
 * qui changent pour chaque instance sont alors affectées
 * 
 * ensuite, les méthodes sont directement liées au prototype de Cercle 
 * (aire et getPi)
 */
class Cercle { 
  constructor(rayon, nom) {
    // propriétés
    this.rayon = rayon;
    this.nom = nom;
  }
  aire() {
    console.log(`Aire de ${this.nom} : ${this.getPi() * this.rayon * this.rayon} m²` );
    console.log(this);
  }
  getPi() {
    return 3.14;
  }
}
// Instanciation 
let petit_cercle = new Cercle(2, "Petit cercle");
// Appel de méthode
petit_cercle.aire();
// Instanciation 
let grand_cercle = new Cercle(4, "Grand cercle");
// Appel de méthode
grand_cercle.aire();

class Card {
  constructor(question, answer) {
    this.question = question;
    this.answer = answer;
  }
  showCard() {
    console.log(`Question : ${this.question} - Réponse : ${this.answer}`);
  }
}
const c1 = new Card("Question1", "qsfqsfqsdqsdf");
const c2 = new Card("Question2", "Réponse 2");
c1.showCard();
c2.showCard();