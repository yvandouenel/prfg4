import DomElements from "./DomElements.js";

export default class Card extends DomElements {
  constructor(question, answer) {
    super();
    this.question = question;
    this.answer = answer;

    this.render();
  }
  render = () => {
    console.log('Dans render de Card');
  }
}