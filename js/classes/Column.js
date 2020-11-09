import DomElements from "./DomElements.js";

export default class Column extends DomElements{
  constructor(cards, title) {
    super();
    this.cards = cards;
    this.title = title;

    this.render();

    // Création des cartes
    this.createCards();
  }
  createCards = () => {
    console.log('Dans createCards');
    
  }
  render = () => {
    console.log('Dans render de Column');
    const section =  this.createCustomElement("section", document.body);
    const title = this.createCustomElement("h3", section, this.title)
  }
  
}