/* Récupération d'un élément du DOM */
const h1 = document.getElementById("h1");
console.log('h1 : ', h1);

for(key in h1) {
  console.log('key : ' +  key + " - type : " + typeof(h1[key]));
}

/* Modification d'un élément du DOM */
h1.textContent = "Autre titre";


/* Création d'un élément du DOM en 3 étapes */
// création
const section = document.createElement("section");
// positionnement dans l'arborescence du DOM en dernier fils de body
document.body.appendChild(section);
// Ajout de texte dans l'élément section
section.textContent = "Texte de ma section";
section.setAttribute("id", "section1");

function createCustomElement(tagname, tagparent, tagtext, tagattributes = {}) {
  const elt = document.createElement(tagname);
  tagparent.appendChild(elt);
  elt.textContent = tagtext;
  for(let key in tagattributes) {
    elt.setAttribute(key, tagattributes[key]);
  }
  return elt;
}
const p1 = createCustomElement("p", section, "Ceci est le texte de p1",{id:"p1", class: "p"});

/* Utilisation de querySelector */
const first_li = document.querySelector(".ul-custom > li");
console.log('First li', first_li);
first_li.textContent = "- " + first_li.textContent;

/* Utilisation de querySelectorAll */
const all_li = document.querySelectorAll(".ul-custom > li");
console.log('all li', all_li);

/* Parcours de tous les éléments de la réponse de querySelectorAll */
for(let li of all_li) {
  li.textContent = "- " + li.textContent;
}

const body = document.querySelector("body");
body.setAttribute("id", "body");
