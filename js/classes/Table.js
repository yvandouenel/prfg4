import Coopernet from "./Coopernet.js";
import Term from "./Term.js";
import Column from "./Column.js";
import DomElements from "./DomElements.js";

export default class Table extends DomElements {
  constructor() {
    super();
    this.coop = new Coopernet("https://www.coopernet.fr");
    this.token = null;
    this.user = null;

    // Affichage du tableau
    this.domElements = this.render();

    // Appel de getTokenUserTerms 
    this.getTokenUserTerms();

    
  }
  render = () => {
    // Création du header dans lequel on trouvera les termes cliquables
    const header = this.createCustomElement("header", document.body);

    // Création du main dans lequel on trouvera les colonnes et les cartes
    const main = this.createCustomElement("main", document.body);

    return {header: header, main: main};
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
        const t = new Term(term.id, term.pid, term.name, this.handleClickTerm, this.domElements.header);
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
    const sections_column = document.querySelectorAll("main > section");
    console.log('Nombre de colonnes : ', sections_column.length);

    if(sections_column.length > 0) {
      // suppression de chaque section fille de la balise main
      for(let section_column of sections_column) {
        this.domElements.main.removeChild(section_column); 
      }
    }

    // boucle sur le tableau des columns récupéré via Terms
    for(let cl of data) {
      console.log('column : ', cl);
      // instanciation des colonnes
      const column = new Column(cl.cartes, cl.name, this.domElements.main);
    }
  }
}