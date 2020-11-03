/* Creation */
const ingredients = ["carotte", "courgette","blanc de poulet", "sauce soja", "oignons", "sel"];

/* console.log(ingredients);
console.log(ingredients[0]);
console.log(ingredients.length);
console.log(ingredients[ingredients.length - 1]); */

// Parcours du tableau "ingredients" avec la method forEach
console.log('Parcours du tableau ingredients');
ingredients.forEach(function(elt,i,array) { // Callback
  console.log(elt);
  /* console.log(i);
  console.log("array : ", array); */
});

// ajout d'un élément au tableau
ingredients.push("ail");
console.log("ingredients : ", ingredients);

const index_soja = ingredients.indexOf("sauce soja");
console.log('Index de la sauce soja : ', index_soja);

//const tiret_ingredients = ingredients.map(function(elt){return ` <li>${elt}</li>`;});
const li_ingredients = ingredients.map(elt => ` <li>${elt}</li>`);
console.log(li_ingredients);

const ingredients_courts = ingredients.filter(elt => elt.length < 5);
console.log('ingredients_courts', ingredients_courts);

const persons = [
  {name: "toto", age: 25},
  {name: "titin", age: 30},
  {name: "bob", age: 57},
  {name: "raoul", age: 2},
  {name: "Raymonde", age: 18}
];

const mineurs = persons.filter(elt => elt.age < 18);
const majeurs = persons.filter(elt => elt.age >= 18);
console.log('mineurs : ', mineurs);
console.log('majeurs : ', majeurs);

persons.sort(function (a, b) {
  if(a.age > b.age) return 1; // on change l'ordre
  else return -1; // Pas de changement d'ordre
});
console.log('tri croissant : ', persons);

const tableau = [{"id":2},{"id":5},{"id":1}];

tableau.sort(function (a, b) {
  if (a.id < b.id)
     return -1;
  if (a.id > b.id)
     return 1;
  // a doit être égal à b
  return 0;
});
console.log("tableau trié par ordre d'id croissant : ", tableau);