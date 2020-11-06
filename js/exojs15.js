import Coopernet from "./classes/Coopernet.js";
import Term from "./classes/Term.js";

const coop = new Coopernet("https://www.coopernet.fr");
getTokenUserTerms();

// Récupération des cartes liées au term surlequel j'ai cliqué

async function getTokenUserTerms() {
  try {
    // Récupération du token
    const token = await coop.getToken();
    console.log('token : ', token);

    // Récupération du n° de user dans la base de données de coopernet
    const user = await coop.getUser("y", "y", token);
    console.log('user : ', user);

    // Récupération des rubriques (terms ex : HTML) 
    const terms = await coop.getTerms(user, token);
    console.log('terms : ', terms);

    // Affichage des termes dans une boule for of
    for (let term of terms) {
      const t = new Term(term.id, term.pid, term.name);
      t.render();
    }
  }
  catch (error) {
    console.log('Erreur : ', error);
  }

}

