import React, { Component } from 'react';
import Coopernet from '../services/Coopernet';

class Table extends Component {
  constructor() {
    super();
    this.coop = new Coopernet("https://www.coopernet.fr");
    this.token = null;
    this.user = null;
    // La proprité state est un objet qui stocke toutes les infos minimum et nécessaires à la 
    // la création de l'interface. Attention, on ne peut pas modifier directement le state.
    // il faut passer par la méthode setState qui compare deux objets et recrée l'interface
    // via la méthode render
    this.state = {
      terms: []
    }
  }
  componentDidMount() {
    console.log('Dans componentDidMount');
    // C'est ici que l'on peut aller chercher les données qui se trouvent sur le serveur
    this.getTokenUserTerms();
  }
  getTokenUserTerms = async () => {
    try {
      // Récupération du this.token
      this.token = await this.coop.getToken();
      console.log('token : ', this.token);

      // Récupération du n° de user dans la base de données de coopernet
      this.user = await this.coop.getUser("y.beneito", "y.beneito", this.token);
      console.log('user : ', this.user);

      // Récupération des rubriques (terms ex : HTML) 
      const terms = await this.coop.getTerms(this.user, this.token);
      console.log('terms : ', terms);

      // Une fois que j'ai les termes, je dois les afficher
      // Attention, quand on veut afficher des éléments dans une appli React, le cyle est tjs le même :
      // -- On fait une copie du state
      // -- On modifie la copie du state 
      // -- Enfin, on compare avec la méthode setState et s'il y a une différence entre la copie et le state, alors Render est automatiquement appelée
      const state_copy = { ... this.state.terms};
      state_copy.terms = terms;
      this.setState(state_copy);

    }
    catch (error) {
      console.log('Erreur : ', error);
    }
  }
  render() {
    return (
      <div>
        <header>
          Logo
          <nav>
            <ul>
              {this.state.terms.map(elt => <li key={elt.id}>{elt.name}</li>)}
            </ul>
          </nav>
        </header>
        <main>
          Les colonnes et les cartes
        </main>
        <footer>
          Footer ici
        </footer>
      </div>
    );
  }

}

export default Table;