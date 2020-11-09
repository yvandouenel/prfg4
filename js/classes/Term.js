import DomElements from "./DomElements.js";

export default class Term extends DomElements {
  constructor(id, pid, name, success, dom_header) {
    super();
    this.id = id;
    this.pid = pid;
    this.name = name;
    // affichage du term sous forme de bouton et récupération des éléments du dom
    this.dom_btn = this.render(dom_header);

    // gestion des événements
    this.manageEvents(success);

  }
  manageEvents = (success) => {
    this.dom_btn.onclick = () => {
      console.log('Bouton cliqué : ' + this.name);
      success(this.id);
    }
  }
  render = (dom_header) => {
    // Création et affichage des éléments du DOM
    return this.createCustomElement("button", dom_header, this.name, {id: this.id});
  }
}