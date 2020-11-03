var xxx = 12;
console.log('xxx : ', xxx);
console.log('xxx : ', window.xxx);
console.log('xxx : ', this.xxx);
console.log('window: ', window);
//alert("Hello World");
console.log(navigator.appCodeName);
console.log("this : ", this);

// fonction constructeur
function lingotOr(valeur) {
  this.valeur = valeur;
  this.couleur = "or";
  console.log("valeur de this", this.valeur);
}
let l1 = new lingotOr(25000);

lingotOr.prototype.poids = "1kg";
console.log('poids l1 : ' + l1.poids);

/* console.log("l1", l1); */
let l2 = new lingotOr(62357);
/* console.log("l2", l2);
console.log('hasOwnProperty');
console.log(l2.hasOwnProperty("couleur")); */

console.log('poids l2 : ' + l2.poids);

// Syntaxe des objets littéraux ou JSON
let l3 = {
  valeur: 78986,
  couleur: "or"
}
/* l3.poids = "1kg";
l3["poids"] = "1kg"; */
console.log("l3", l3);
Object.prototype.poids = "1kg";
/*console.log('hasOwnProperty');
console.log(l3.hasOwnProperty("couleur")); */
console.log('poids l3 : ' + l3.poids);

let l4 = new Object({
  valeur: 5555,
  couleur: "or"
});
console.log('l4', l4);

//let i = 12;
let i = new Number(12);
console.log('i : ' , i);

let s = new String("Hello World");
console.log('s :', s);