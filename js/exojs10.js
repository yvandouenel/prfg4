
class Card {
  constructor(question, answer) {
    this.question = question;
    this.answer = answer;

    // Dessine la carte et récupère les éléments du DOM correspondants
    this.dom_elements = this.drawCard();

    this.dom_elements.delete_button.onclick = () => {
      console.log('bouton delete cliqué');
      console.log("this : ", this);
      
      this.dom_elements.article.parentNode.removeChild(this.dom_elements.article);
    }

  }
  drawCard = function() {
    const article = this.createCustomElement("article", document.body, "", {"class": "card"});
    const h2 = this.createCustomElement("h2", article, this.question);
    const h3 = this.createCustomElement("h3", article, this.answer);
    const delete_button = this.createCustomElement("button", article, "Supprimer");
    return {
      article: article,
      question: h2,
      answer: h3,
      delete_button: delete_button
    };
  }
  createCustomElement = function(tagname, tagparent, tagtext = "", tagattributes = {}) {
    // création d'un élément du dom
    const elt = document.createElement(tagname);
    // insertion de elt comme dernier fils de tagparent
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

const form = document.querySelector("#form-add-card");
form.onsubmit = function(event) {
  // appel de la méthode preventDefault qui va arrêter 
  // le comportement par défaut de l'événement
  event.preventDefault();
  console.log('Evénement de soumission du formulaire stoppé');

  const question = document.querySelector("#question").value;
  const answer = document.querySelector("#answer").value;
  
  const card = new Card(question, answer);
}




