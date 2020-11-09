import DomElements from "./DomElements.js";

export default class Card extends DomElements {
  constructor(question, answer, explanation, col_dom_section) {
    super();
    this.question = question;
    this.answer = answer;
    this.explanation = explanation;

    this.render(col_dom_section);
  }
  render = (col_dom_section) => {
    console.log('Dans render de Card');
    const article =  this.createCustomElement("article", col_dom_section);
    const h4 = this.createCustomElement("h4", article, this.question);
    const h5 = this.createCustomElement("h5", article, this.answer);
    const p = this.createCustomElement("p", article, this.explanation);

  }
}