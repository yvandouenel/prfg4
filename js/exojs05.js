/* let agestring = "18";
let age = 18;
if(age < 18) { // comparaison
  console.log('Vous êtes mineur');
} else if(age === agestring) {
  console.log('Vous êtes tout juste majeur');
}
else if (age > 18) {
  console.log('Vous êtes majeur');
  console.log('Débrouillez vous !');
}
else {
  console.log(`Vous n'avez pas d'âge !`);
}
console.log('A la prochaine'); */

/* for(let i = 0; i < 10; i++) {
  console.log(i);
}
console.log('fin de la boucle for');
 */
/* let i = 2;
let j = i;
// on compare la valeur et le type dans le cas de variables de type primitif
if (i === j) console.log('i et j identiques'); 
i = 3;
console.log('i : ', i);
console.log('j : ', j); */


const p1 = {name: "Bob"};
p1.firstname = "Toto";

console.log('p1 : ', p1);
console.log('p1["firstname"] : ', p1["firstname"]);
console.log('p1.firstname : ', p1.firstname);
// parcours d'un tableau associatif (ou objet) avec for...in
for(let key in p1) {
  console.log('key : ', key, " - valeur : ", p1[key]);
}

// parcours d'un tableau à index avec la boucle for ... of
const fruits = ["Cerise", "Pomme"];
for(let fruit of fruits) {
  console.log(fruit);
}