export default class Term {
  constructor(id, pid, name) {
    this.id = id;
    this.pid = pid;
    this.name = name;
  }
  render = () => {
    // Création et affichage des éléments du DOM
    const btn = this.createCustomElement("button", document.body, this.name, {id: this.id});
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