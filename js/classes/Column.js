import Card from "./Card.js";
import DomElements from "./DomElements.js";

export default class Column extends DomElements{
  constructor(cards, title, dom_main) {
    super();
    this.cards = cards;
    this.title = title;

    // affichage de la colonne courante
    this.dom_section = this.render(dom_main);

    // Création des cartes
    this.createCards();
  }
  createCards = () => {
    console.log('Dans createCards');
    for(let c of this.cards) {
      const card = new Card(c.question, c.reponse, c.explication, this.dom_section);
    }

  }
  render = (dom_main) => {
    console.log('Dans render de Column');
    const section =  this.createCustomElement("section", dom_main);
    const title = this.createCustomElement("h3", section, this.title)

    return section;
  }
  
}