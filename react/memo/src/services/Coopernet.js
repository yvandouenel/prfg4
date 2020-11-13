export default class Coopernet {
  constructor(url) {
    this.url = url;
    this.user = null;
    this.token = "";
  }
  getToken = () => {
    return fetch(`${this.url}/rest/session/token/`)
      .then(function (response) {
        if (response.status !== 200) { // si ça c'est mal passé
          throw new Error("Le serveur n'a pas répondu correctement");
        } else return response.text(); // renvoie une promesse
      })
      .then((data) => { // data correspond au retour du résolve (ici deux lignes au dessus)
        
        this.token = data;
        console.log('token dans coopernet : ', this.token);
      });
  }

  getUser = (login, pwd) => {
    console.log("dans getUser de Coopernet");
    // utilisation de fetch
    return fetch(`${this.url}/user/login?_format=json`, {
      credentials: "same-origin",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": this.token
      },
      body: JSON.stringify({
        name: login,
        pass: pwd
      })
    })
      .then(response => response.json())
      .then(data => {
        //console.log("success", data);
        if (data.current_user === undefined) {
          
          throw new Error("Erreur de data : ", data);
        } else {
          console.log("user dans getUser de coopernet", data.current_user);
          this.user = {
            userid: data.current_user.uid,
            userlogin: login,
            userpwd: pwd
          }
          console.log('this.user dans getUser de coopernet :', this.user);
          return this.user;

        }
      })
      .catch(error => { console.error("Erreur attrapée dans getUser de Coopernet", error) });

  };

  getTerms = () => {
    // création de la requête
    console.log("Dans getTerms");
    return fetch(`${this.url}/memo/themes/` +
      this.user.userid, {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/hal+json",
        "X-CSRF-Token": this.token,
        "Authorization": "Basic " + btoa(this.user.userid + ":" + this.user.userpwd) // btoa = encodage en base 64
      }
    })
      .then(response => {
        if (response.status === 200) return response.json(); // vérifie que le format json
        else throw new Error("Problème de réponse ", response);
      })
      .then(data => {
        console.log("data reçues dans getTerms :", data);
        if (data) {
          return data;
        } else {
          throw new Error("Problème de data ", data);
        }
      })
      .catch(error => { console.error("Erreur attrapée dans getTerms", error); });
  };
  getCards = (term_number) => {
    return fetch(this.url +
      "/memo/list_cartes_term/" +
      this.user.userid +
      "/" +
      term_number +
      "&_format=json&time=" +
      Math.floor(Math.random() * 10000), {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/hal+json",
        "X-CSRF-Token": this.token,
        "Authorization": "Basic " + btoa(this.user.userid + ":" + this.user.userpwd) // btoa = encodage en base 64
      }
    })
    .then(response => {
      if (response.status === 200) return response.json(); // vérifie que le format json est respecté
      else throw new Error("Problème de réponse ", response);
    })
    .then(data => {
      console.log("data reçues dans getTerms :", data);
      if (data) {
        return data;
      } else {
        throw new Error("Problème de data ", data);
      }
    })
    .catch(error => { console.error("Erreur attrapée dans getTerms", error); });;
  }
  updateCard = (
    card,
    themeid,
    columnid
  ) => {
    console.log("Dans updateCard de coopernet");
    
    // création de la requête avec fetch
    return fetch(this.url + "/node/" + card.id + "?_format=hal_json", {
      // permet d'accepter les cookies ?
      credentials: "same-origin",
      method: "PATCH",
      headers: {
        "Content-Type": "application/hal+json",
        "X-CSRF-Token": this.token,
        Authorization: "Basic " + btoa(this.user.userlogin + ":" + this.user.userpwd) // btoa = encodage en base 64
      },
      body: JSON.stringify({
        _links: {
          type: {
            href: this.url + "/rest/type/node/carte"
          }
        },
        title: [
          {
            value: card.question
          }
        ],
        field_carte_question: [
          {
            value: card.question
          }
        ],
        field_carte_reponse: [
          {
            value: card.reponse
          }
        ],
        field_carte_explication: [
          {
            value: card.explication
          }
        ],
        field_carte_colonne: [
          {
            target_id: columnid,
            url: "/taxonomy/term/" + columnid
          }
        ],
        field_carte_thematique: [
          {
            target_id: themeid,
            url: "/taxonomy/term/" + themeid
          }
        ],
        type: [
          {
            target_id: "carte"
          }
        ]
      })
    })
      .then(response => {
        console.log('statut de la réponse ', response.status);
        if(response.status == 403) throw new Error("Problème pour enregistrer la carte")
        return response.json();
      })
      .then(data => {
        console.log("data reçues :", data);
       
        if (data) {
          return data;
        } else {
          throw new Error("Problème dans updateCard", data);
        }
      });
  };
  /**
   * Permet d'enregistrer une nouvelle carte en base de données
   * Si la promesse est résolue (resolve) et que le serveur renvoie
   * bien les informations concernant la nouvelle carte, la méthode renvoie 
   * le numéro identifiant de la carte en base de données
   * @param {object} user 
   * @param {string} token 
   * @param {object} card 
   * @param {number} term_id 
   * @returns {Promise} la promesse est automatiquement générée par Fetch
   */
  addCard = (
    card,
    term_id
  ) => {
    console.log("Dans createReqAddCards de coopernet");
    // création de la requête
    // utilisation de fetch
    return fetch(this.url + "/node?_format=hal_json", {
      // permet d'accepter les cookies ?
      credentials: "same-origin",
      method: "POST",
      headers: {
        "Content-Type": "application/hal+json",
        "X-CSRF-Token": this.token,
        Authorization: "Basic " + btoa(this.user.userlogin + ":" + this.user.userpwd) // btoa = encodage en base 64
      },
      body: JSON.stringify({
        _links: {
          type: {
            href: this.url + "/rest/type/node/carte"
          }
        },
        title: [
          {
            value: card.question
          }
        ],
        field_carte_question: [
          {
            value: card.question
          }
        ],
        field_carte_reponse: [
          {
            value: card.reponse
          }
        ],
        field_carte_explication: [
          {
            value: card.explication
          }
        ],
        field_carte_colonne: [
          {
            target_id: card.colonne,
            url: "/taxonomy/term/" + card.colonnne
          }
        ],
        field_carte_thematique: [
          {
            target_id: term_id,
            url: "/taxonomy/term/" + term_id
          }
        ],
        type: [
          {
            target_id: "carte"
          }
        ]
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log("data reçues dans addCard: ", data);
        if (data.hasOwnProperty("created") && data.created[0].value) {
          return data.nid[0].value; // retourne la nouvelle id de la carte
        } else {
          throw new Error("Problème de donnée dans addCard : ", data);
        }
      });
  };
}