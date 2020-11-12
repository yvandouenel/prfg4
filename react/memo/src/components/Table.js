import React, { Component } from 'react';
import Coopernet from '../services/Coopernet';
import Column from './Column';
import FormLogin from './FormLogin';


class Table extends Component {
  constructor() {
    super();
    this.coop = new Coopernet("https://www.coopernet.fr");
    this.token = null;

    // La proprité state est un objet qui stocke toutes les infos minimum et nécessaires à la 
    // la création de l'interface. Attention, on ne peut pas modifier directement le state.
    // il faut passer par la méthode setState qui compare deux objets et recrée l'interface
    // via la méthode render
    this.state = {
      terms: [],
      columns: [],
      term_selected: null,
      user: null,
      error: null
    }
  }
  componentDidMount() {
    console.log('Dans componentDidMount');
    // C'est ici que l'on peut aller chercher les données qui se trouvent sur le serveur
    // Premièrement : récupérer le token
    this.getToken();
  }
  getToken = async () => {
    try {
      // Récupération du this.token
      this.token = await this.coop.getToken();
      console.log('token : ', this.token);
    }
    catch (error) {
      console.log('Erreur de token dans getToken de Table : ', error);
      // On modifie l'interface via la méthode habituelle
      const state_copy = { ...this.state };
      state_copy.error = error;
      this.setState(state_copy);
    }
  }
  getUserTerms = async (login, pwd) => {
    try {

      // Récupération du n° de user dans la base de données de coopernet
      this.state.user = await this.coop.getUser(login, pwd, this.token);
      if (!this.state.user) throw new Error("Erreur de login ");
      console.log('user ici : ', this.state.user);

      // Récupération des rubriques (terms ex : HTML) 
      const terms = await this.coop.getTerms(this.state.user, this.token);
      console.log('terms : ', terms);

      // Une fois que j'ai les termes, je dois les afficher
      // Attention, quand on veut afficher des éléments dans une appli React, le cyle est tjs le même :
      // -- On fait une copie du state
      // -- On modifie la copie du state 
      // -- Enfin, on compare avec la méthode setState et s'il y a une différence entre la copie et le state, alors Render est automatiquement appelée
      const state_copy = { ...this.state.terms };
      // Ajout de la propriété "selected" à chaque term
      for (let term of terms) {
        term.selected = false;
      }

      state_copy.terms = terms;
      state_copy.error = null;
      this.setState(state_copy);

    }
    catch (error) {
      console.log('Erreur ici : ', error);
      console.log('this : ', this);
      // Pour afficher l'erreur, il va falloir modifier le state avec la procédure habituelle
      const state = { ...this.state };
      state.error = error;
      this.setState(state);
    }
  }

  handleClickCardMove = (col_index, card_index, direction) => {
    console.log('Dans handleClickRight ');
    console.log('col_index : ', col_index);
    console.log('card_index : ', card_index);

    // Pour changer l'interface (ici les colonnes et les cartes), il faut :
    // - Copier le state
    // - Modifier la copie du state (ici columns)
    // - Comparer le state copié et le state encours via setState(copie-du-state)
    const state_copy = { ...this.state };
    let card = null;
    if (direction === "right") {
      // calcul de la colonne de droite via "%" qui est l'opérateur du reste de la division euclidienne
      const next_col = ((col_index + 1) % 4);
      console.log('Next col : ', next_col);
      // on ajoute la carte cliquée dans la prochaine colonne
      state_copy.columns[next_col].cartes.push(state_copy.columns[col_index].cartes[card_index]);
      card = state_copy.columns[next_col].cartes[state_copy.columns[next_col].cartes.length - 1];
      card.colonne = state_copy.columns[next_col].id;
      // on supprime la carte cliquée du state copié
      state_copy.columns[col_index].cartes.splice(card_index, 1);
    } else {
      // calcul de la colonne de gauche via "%" qui est l'opérateur du reste de la division euclidienne
      let previous_col = ((col_index - 1) % 4);
      if (previous_col == -1) previous_col = 3;
      console.log('Previous col : ', previous_col);
      // on ajoute la carte cliquée dans la colonne précédente
      state_copy.columns[previous_col].cartes.push(state_copy.columns[col_index].cartes[card_index]);
      card = state_copy.columns[previous_col].cartes[state_copy.columns[previous_col].cartes.length - 1];
      card.colonne = state_copy.columns[previous_col].id;
      // on supprime la carte cliquée du state copié
      state_copy.columns[col_index].cartes.splice(card_index, 1);
    }

    // on compare le state actuel au state copié
    // ensuite on appelle updateCard
    this.setState(state_copy, () => { this.updateCard(card) });

  }
  updateCard = async (card, themeid, columnid) => {
    try {
      console.log('Dans updateCard - carte bougée : ', card);
      console.log('Rubrique en cours : ', this.state.term_selected);
      await this.coop.updateCard(this.state.user, this.token, card, this.state.term_selected.id, card.column);
    }
    catch (error) {
      console.log('Erreur attrapée dans updateCard: ', error);
      // On modifie l'interface via la méthode habituelle
      const state_copy = { ...this.state };
      state_copy.error = error;
      this.setState(state_copy);
    }

  }
  handleClickTerm = async term => {
    console.log('Dans handleClickTerm - id du terme cliqué : ', term.id);
    // Je peux aller chercher les colonnes et les cartes qui concernent ce terme
    const columns = await this.coop.getCards(this.state.user, this.token, term.id);
    console.log('columns dans handleClickTerm : ', columns);

    // Pour changer l'interface (ici les colonnes et les cartes), il faut :
    // - Copier le state
    // - Modifier la copie du state (ici columns)
    // - Comparer le state copié et le state encours via setState(copie-du-state)
    const state_copy = { ...this.state };
    // On remet toutes les propriétés selected des termes à faux
    for (let term of state_copy.terms) {
      term.selected = false;
    }
    // Changement de la propriété selected sur le term cliqué
    const index_term_selected = state_copy.terms.indexOf(term);
    console.log('Index du term sélectionné : ', index_term_selected);
    state_copy.terms[index_term_selected].selected = true;

    state_copy.columns = columns;
    state_copy.term_selected = term;
    this.setState(state_copy);

  }
  handleSubmitLoginForm = event => {
    console.log('Dans handleSubmitLoginForm');
    // Permet de ne pas recharger la page
    event.preventDefault();
    // Récupération des éléments du formulaire
    const login = document.querySelector("#login").value;
    const pwd = document.querySelector("#pwd").value;

    // C'est le moment d'aller chercher les infos sur le serveur !
    // Récupérons les données de l'utilisateur puis des termes qui lui sont liées
    this.getUserTerms(login, pwd);

  }
  handleClickLogout = () => {
    console.log('Dans handleClickLogout');
    // Pour changer l'interface (ici l'utilisateur), il faut :
    // - Copier le state - ici, le remettre à son état original
    // - Comparer le state copié et le state encours via setState(copie-du-state)
    const state_original = {
      terms: [],
      columns: [],
      term_selected: null,
      user: null
    }
    this.setState(state_original);

  }
  renderClassNameTerm = (term) => {
    const class_term = (term.selected) ? "btn-success" : "btn-warning";
    return class_term;
  }
  render() {
    return (
      <div>
        <header>
          <div className="d-flex justify-content-center bg-secondary align-items-center">
            <h1 id="title-memo" className="text-light text-center ">
              <a className="text-light m-2" href="/my-tables">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="icon-logo" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M209.5 18.66c-7.4-.02-14.8 1.93-19.2 6.96-3.1 3.59-4.8 8.46 0 19.19 5.2 8.08 9.3 19.06 12.9 33.12l-17.9 4.66c-6.1-23.73-13.8-33-18.5-35.1-2.4-1.04-4.7-1.14-8.3 0-3.7 1.11-8.4 3.68-13.5 7.47-7.9 5.8-12.6 13.22-12.4 19.25 3.7 12.42 13.1 18.6 25 24.19l-8 16.8c-4.6-2.1-8.7-4.4-12.4-6.8-13.3-7.3-23.1-10.38-28-9.97-2.6.22-4.1.85-6 2.77-2 2-4.4 5.7-6.5 11.6-3.5 9.9-4 17.7-1.5 21.8 2 3.2 7.2 6.9 20.1 8.2 3.3.1 6.7.2 10.4.4v.1h1.1l.2 18.7c-3.8 0-7.3-.1-10.6-.4-11.1-.1-17.7.8-20.2 2.1-1.6.8-2.1 1.3-2.9 3-.9 1.8-1.8 5.1-2.4 10-.6 4.5-.2 7.6.7 9.8.9 2.1 2.1 3.6 5.3 5.3 6.5 3.5 21.7 5.8 47.3 3.7l1.5 18.6c-17.2 1.5-30.7 1.5-41.5-.5 4.7 15.1 14.5 21.9 25.7 21.9h94c10.6 0 19.8-7.7 23.4-22.1l8.1-32.1 9.9 31.6c4.7 14.8 14.2 22.6 23.5 22.6H383c11.2 0 21.1-6.9 25.7-22-10.9 2.1-24.6 2.1-42.4.6l1.6-18.6c25.6 2.1 40.7-.2 47.2-3.7 3.2-1.7 4.4-3.2 5.3-5.3 1.4-6.3 2.1-19.3-4.5-22.8-2.5-1.2-9.1-2.2-20.2-2.1-3.3.3-6.8.4-10.6.4l.2-18.7h1v-.1c3.8-.2 7.2-.3 10.4-.4 12.9-1.3 18.2-5 20.2-8.2 2.5-4.1 2-11.9-1.6-21.8-2.3-6.2-6-13.77-12.4-14.37-17.1 2.07-29.1 9.67-40.4 16.77l-8-16.8c4.4-1.98 7.7-4.22 11.7-6.56 10.2-6.88 13-13.02 13.3-17.63.2-6.03-4.6-13.45-12.4-19.25-5.2-3.79-9.8-6.35-13.5-7.47-3.6-1.11-6-1.01-8.3 0-1.7.72-3.7 2.34-5.8 5.09-5.7 9.01-10.4 21.31-12.7 30l-18.1-4.66c4.1-15.76 8.8-27.65 15-35.93 3.3-8.79 1.7-13.12-1.1-16.38-9.4-7.73-28.3-9.73-38.7-1.99-4.5 3.34-8.1 8.5-10.9 15-5.5 12.97-7.1 30.87-7.1 43.99v.1l-.2 30.79v.1h-18.6v-.1l-.2-30.83v-.1c0-13.12-1.6-31.02-7.2-44.03-2.7-6.5-6.3-11.66-10.8-15-4.5-2.86-12-4.86-19.4-4.88zm47.2 217.94c-7.9 10.7-19.4 17.6-32.8 17.6h-42.8c2 4.3 5.4 8.2 10 11.8 11.8 9 32.1 15 53.6 16.4l-.6.6c-7.9 8.5-33.2 6.5-48 .9-35-12.8-67.9-21.9-101.28-11.1-43.77 17.3-74.86 66.9-65.53 113.1 10.36 51.3 66.85 124.2 121.11 99.8 61.3-27.6 11.4-114.5-25.3-132.1 8.5 23.2 39.8 79.9 11.4 91.9-34.2 14.4-81.56-43.6-69.48-86.9 20.71-57.4 66.08-49.5 99.38-37.5 60.3 21.7 31.2 169.9 95.2 167.1 38.9-1.7 85.4-60.7 48.7-106.3 3.9 28.6-20.4 75.5-42.9 63.4-33.8-18.1 12.2-84.5 43.7-106.6 24.4-17.1 70.6-28.1 89.5-3.7 29.8 38.6-53.2 74.2-27.7 118.3 22.5 39 75.7 47.4 117.6-10.8-29.1 17.4-68.6 25.8-79.6 1.6-14.1-31.1 62.7-35.3 69.1-76 5.8-36.7-18.3-73.9-49.6-93.9-39.9-25.6-109.3 30.9-160.3 7.7 19.7-2.1 37.9-8.1 48.6-16.7 4.2-3.4 7.3-7 9.3-11h-39.2c-12.9 0-24.2-7-32.1-17.6z"></path></svg>
              </a>e<span id="m-memo">M</span>o
          </h1>
            {this.state.user && (
              <button
                onClick={this.handleClickLogout}
                className="btn btn-danger ml-5"
              >Déconnexion
              </button>
            )}
          </div>

          <div className="container-fluid">
            <nav>
              <ul className="list-unstyled d-flex justify-content-center">
                {
                  this.state.terms.map(
                    elt => <li
                      onClick={() => { this.handleClickTerm(elt) }}
                      className={`btn m-2 ${this.renderClassNameTerm(elt)}`}
                      key={elt.id}>
                      {elt.name}
                    </li>
                  )}
              </ul>
            </nav>
            {this.state.term_selected && (
              <h2>{this.state.term_selected.name}</h2>
            )}

          </div>

        </header>
        <main className="container-fluid">
          <section className="row">
            <div className="col">
              {this.state.error && (
                <h2 className="alert alert-warning">Erreur : {this.state.error.message} - Merci de contacter le développeur : bob@devel.org</h2>
              )}
              {!this.state.user && (
                <div className="d-flex justify-content-center">
                  <FormLogin onSubmitLoginForm={this.handleSubmitLoginForm} />
                </div>
              )}

            </div>
          </section>
          <section className="row">
            {this.state.columns.map((col, index) =>
              <Column key={col.id}
                col_name={col.name}
                cards={col.cartes}
                onClickCardMove={this.handleClickCardMove}
                col_index={index}
              />)}
          </section>

        </main>
        <footer className="container-fluid">
          Footer ici
        </footer>
      </div>
    );
  }

}

export default Table;