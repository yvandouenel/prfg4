export default class DomElements {
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