import Card from "./Card.js";
import DomElements from "./DomElements.js";

export default class Column extends DomElements{
  constructor(cards, title) {
    super();
    this.cards = cards;
    this.title = title;

    // affichage de la colonne courante
    this.dom_section = this.render();

    // Création des cartes
    this.createCards();
  }
  createCards = () => {
    console.log('Dans createCards');
    for(let c of this.cards) {
      const card = new Card(c.question, c.reponse, c.explication, this.dom_section);
    }

  }
  render = () => {
    console.log('Dans render de Column');
    const section =  this.createCustomElement("section", document.body);
    const title = this.createCustomElement("h3", section, this.title)

    return section;
  }
  
}