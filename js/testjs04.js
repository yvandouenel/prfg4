// appel de la fonction "ajoute" avec les arguments 1 et 3
// fonctionne grâce au "hoisting"
//console.log(ajoute(1,3)); 
/**
 * Fonction qui attend 2 paramètres et qui renvoie leur somme
 * @param {number} i 
 * @param {number} j 
 * @return {number}
 */
/* function ajoute(i, j) { // paramètres
  console.log('i : ', i);// Les variables sont "function scope"
  return i + j;
}

let add = function(i, j) { // paramètres
  console.log('i : ', i);// Les variables sont "function scope"
  console.log(i + j);
}
add(12,63);  */

/* Fonctions fléchées ou arrow function */

/* function ajoute(i, j) {
  return i + j;
} */

const ajoute = (i, j) => i + j;
console.log(ajoute(7, 5));

var multiplieParDeux = i => i * 2;
console.log(multiplieParDeux(5));

