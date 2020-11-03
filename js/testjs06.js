function creerFonction() {
  var nom = "Mozilla";
  function afficheNom() {
    let i = 12;
    console.log(nom, i);
  }
  return afficheNom;
}
let maFonction = creerFonction();// à ne pas confondre avec let maFonction = creerFonction;
maFonction();
console.log('i : ', i);
//console.log('nom : ', nom);

// contexte execution affichNom : i
// contexte execution creerFonction : nom et affichNom()
// contexte execution global : creerFonction() et maFonction