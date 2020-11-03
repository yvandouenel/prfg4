console.log('dans exojs09');
const button = document.querySelector("button");
let cpt = 0;
button.onclick = function() {
  cpt ++;
  createCustomElement("p", document.body, "Texte " + cpt);
}

function createCustomElement(tagname, tagparent, tagtext, tagattributes = {}) {
  const elt = document.createElement(tagname);
  tagparent.appendChild(elt);
  elt.textContent = tagtext;
  for(let key in tagattributes) {
    elt.setAttribute(key, tagattributes[key]);
  }
  return elt;
}
