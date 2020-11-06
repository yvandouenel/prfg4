export default class Term {
  constructor(id, pid, name) {
    this.id = id;
    this.pid = pid;
    this.name = name;
    // affichage du term sous forme de bouton et récupération des éléments du dom
    this.dom_btn = this.render();

    // gestion des événements
    this.manageEvents();

  }
  manageEvents = () => {
    this.dom_btn.onclick = () => {
      console.log('Bouton cliqué : ' + this.name);
    }
  }
  render = () => {
    // Création et affichage des éléments du DOM
    return this.createCustomElement("button", document.body, this.name, {id: this.id});
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