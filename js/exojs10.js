class Card {
  constructor(question, answer) {
    this.question = question;
    this.answer = answer;
    console.log('nouvelle carte : ', this);
  }
  drawCard = function() {
    const article = this.createCustomElement("article",document.body);
    const h2 = this.createCustomElement("h2", article, this.question);
    const h3 = this.createCustomElement("h3", article, this.answer);
  }
  createCustomElement = function(tagname, tagparent, tagtext = "", tagattributes = {}) {
    const elt = document.createElement(tagname);
    tagparent.appendChild(elt);
    if(tagtext != "") {
      elt.textContent = tagtext;
    }
    
    for(let key in tagattributes) {
      elt.setAttribute(key, tagattributes[key]);
    }
    return elt;
  }
}

const form = document.querySelector("form");
form.onsubmit = function(event) {
  event.preventDefault();
  console.log('Evénement de soumission du formulaire stoppé');
  const question = document.querySelector("#question").value;
  const answer = document.querySelector("#answer").value;
  console.log('question', question);
  console.log('answer', answer);
  const card = new Card(question, answer);
  card.drawCard();
}




