class Card {
  constructor(question, answer) {
    this.question = question;
    this.answer = answer;

    // Dessine la carte et récupère les éléments du DOM correspondants
    this.dom_elements = this.drawCard();

    // Gestion de tous les événements
    this.manageEvents();
  }
  manageEvents = function() {
    // gestion de l'événement click sur le bouton de suppression de la carte
    this.dom_elements.delete_button.onclick = () => {
      console.log('bouton delete cliqué');
      console.log("this dans manageEvents : ", this);
      this.dom_elements.article.parentNode.removeChild(this.dom_elements.article);
    };

    // gestion de la sousmission du formulaire de modification d'une carte
    this.dom_elements.up_form.onsubmit = (event) => {
      event.preventDefault();
      console.log('Dans le gestionnnaire evenement du formulaire de modification de la carte');
      
      // Récupération des valeurs des inputs pour la question et la réponse
      const question = this.dom_elements.up_question.value;
      const answer = this.dom_elements.up_answer.value;

      if(question) {
        this.dom_elements.question.textContent = question;
        this.question = question;
      }
      if(answer) {
        this.dom_elements.answer.textContent = answer;
        this.answer = answer;
      }
    }
  }
  drawCard = function() {
    const article = this.createCustomElement("article", document.body, "", {"class": "card"});
    const h2 = this.createCustomElement("h2", article, this.question);
    const h3 = this.createCustomElement("h3", article, this.answer);
    const delete_button = this.createCustomElement("button", article, "Supprimer");
    const up_form = this.createCustomElement("form", article);
    this.createCustomElement("label", up_form, "Question");
    const up_question = this.createCustomElement("input", up_form);
    this.createCustomElement("label", up_form, "Réponse");
    const up_answer = this.createCustomElement("input", up_form);
    this.createCustomElement("button", up_form, "Modifier");
    return {
      article: article,
      question: h2,
      answer: h3,
      delete_button: delete_button,
      up_form: up_form,
      up_question: up_question,
      up_answer: up_answer
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





