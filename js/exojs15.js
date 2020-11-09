import Coopernet from "./classes/Coopernet.js";
import Term from "./classes/Term.js";
import Column from "./classes/Column.js";
import DomElements from "./classes/DomElements.js";

class Table extends DomElements {
  constructor() {
    super();
    this.coop = new Coopernet("https://www.coopernet.fr");
    this.token = null;
    this.user = null;

    // Appel de getTokenUserTerms 
    this.getTokenUserTerms();
  }
  getTokenUserTerms = async () => {
    try {
      // Récupération du this.token
      this.token = await  this.coop.getToken();
      console.log('token : ', this.token);
  
      // Récupération du n° de user dans la base de données de coopernet
      this.user = await  this.coop.getUser("y.beneito", "y.beneito", this.token);
      console.log('user : ', this.user);
  
      // Récupération des rubriques (terms ex : HTML) 
      const terms = await  this.coop.getTerms(this.user, this.token);
      console.log('terms : ', terms);
  
      // Affichage des termes dans une boule for of
      for (let term of terms) {
        const t = new Term(term.id, term.pid, term.name, this.handleClickTerm);
      }
    }
    catch (error) {
      console.log('Erreur : ', error);
    }
  }
  handleClickTerm = async (tid) => {
    // Récupération des cartes liées au term surlequel j'ai cliqué
    const data = await  this.coop.getCards(this.user, this.token, tid);
    this.createColumns(data);
  }
  createColumns = (data) => {
    // boucle sur le tableau des columns récupéré via Terms
    for(let cl of data) {
      console.log('column : ', cl);
      // instanciation des colonnes
      const column = new Column(cl.cartes, cl.name);
    }
  }
}
// Instanciation du tableau
const t = new Table();






