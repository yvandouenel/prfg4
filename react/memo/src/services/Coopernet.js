export default class Coopernet {
  constructor(url) {
    this.url = url;
  }
  getToken = () => {
    return fetch(`${this.url}/rest/session/token/`)
      .then(function (response) {
        if (response.status !== 200) { // si ça c'est mal passé
          throw new Error("Le serveur n'a pas répondu correctement");
        } else return response.text(); // renvoie une promesse
      })
      .then(function (data) { // data correspond au retour du résolve (ici deux lignes au dessus)
        return data;
      });
  }

  getUser = (login, pwd, token) => {
    console.log("dans getUser");
    // utilisation de fetch
    return fetch(`${this.url}/user/login?_format=json`, {
      credentials: "same-origin",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": token
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
          //console.log("user", data.current_user);
          return {
            userid: data.current_user.uid,
            userlogin: login,
            userpwd: pwd
          }

        }
      })
      .catch(error => { console.error("Erreur attrapée dans getUser de Coopernet", error) });

  };

  getTerms = (user, token) => {
    // création de la requête
    console.log("Dans getTerms");
    return fetch(`${this.url}/memo/themes/` +
      user.userid, {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/hal+json",
        "X-CSRF-Token": token,
        "Authorization": "Basic " + btoa(user.userid + ":" + user.userpwd) // btoa = encodage en base 64
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
  getCards = (user, token, term_number) => {
    return fetch(this.url +
      "/memo/list_cartes_term/" +
      user.userid +
      "/" +
      term_number +
      "&_format=json&time=" +
      Math.floor(Math.random() * 10000), {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/hal+json",
        "X-CSRF-Token": token,
        "Authorization": "Basic " + btoa(user.userid + ":" + user.userpwd) // btoa = encodage en base 64
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
    user,
    token,
    card,
    themeid,
    columnid
  ) => {
    console.log("Dans updateCard de coopernet");
    // création de la requête avec fetch
    fetch(this.url + "/node/" + card.id + "?_format=hal_json", {
      // permet d'accepter les cookies ?
      credentials: "same-origin",
      method: "PATCH",
      headers: {
        "Content-Type": "application/hal+json",
        "X-CSRF-Token": token,
        Authorization: "Basic " + btoa(user.userid + ":" + user.userpwd) // btoa = encodage en base 64
      },
      body: JSON.stringify({
        _links: {
          type: {
            href: this.url_server + "rest/type/node/carte"
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
      .then(response => response.json())
      .then(data => {
        console.log("data reçues :", data);
        if (data) {
          return data;
        } else {
          throw new Error("Problème de donnée", data);
        }
      });
  };
}