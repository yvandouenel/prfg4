import Coopernet from "./classes/Coopernet.js";
import Term from "./classes/Term.js";
import Column from "./classes/Column.js";

const coop = new Coopernet("https://www.coopernet.fr");
getTokenUserTerms();
let token, user;

// Récupération des cartes liées au term surlequel j'ai cliqué

async function getTokenUserTerms() {
  try {
    // Récupération du token
    token = await coop.getToken();
    console.log('token : ', token);

    // Récupération du n° de user dans la base de données de coopernet
    user = await coop.getUser("y.beneito", "y.beneito", token);
    console.log('user : ', user);

    // Récupération des rubriques (terms ex : HTML) 
    const terms = await coop.getTerms(user, token);
    console.log('terms : ', terms);

    // Affichage des termes dans une boule for of
    for (let term of terms) {
      const t = new Term(term.id, term.pid, term.name, handleClickTerm);
    }
  }
  catch (error) {
    console.log('Erreur : ', error);
  }
}
async function handleClickTerm(tid) {
  const data = await coop.getCards(user, token, tid);
  createColumns(data);
}
function createColumns(data) {
  // boucle sur le tableau des columns récupéré via Terms
  for(let cl of data) {
    console.log('column : ', cl);
    // instanciation des colonnes
    const column = new Column(cl.cartes, cl.name);
  }
}


