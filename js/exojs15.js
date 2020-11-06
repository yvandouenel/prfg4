"use strict";
(function () {

  getTerms();

  // Récupération des cartes liées au term surlequel j'ai cliqué

  async function getTerms() {
    try {
      // Récupération du token
      const token = await getToken();
      console.log('token : ', token);
      // Récupération du n° de user dans la base de données de coopernet
      const user = await getUser("y","y",token);
      console.log('user : ', user);

      // Récupération des rubriques (terms ex : HTML) 
    }
    catch (error) {
      console.log('Erreur : ', error);
    }

  }

  function getToken() {
    return fetch("https://www.coopernet.fr/rest/session/token/")
      .then(function (response) {
        if (response.status !== 200) { // si ça c'est mal passé
          throw new Error("Le serveur n'a pas répondu correctement");
        } else return response.text(); // renvoie une promesse
      })
      .then(function (data) { // data correspond au retour du résolve (ici deux lignes au dessus)
        return data;
      })
      .catch(error => { console.log("Erreur attrapée : ", error) });
  }

  function getUser(login, pwd, token){
    console.log("dans getUser");
    // utilisation de fetch
    return fetch("https://www.coopernet.fr/user/login?_format=json", {
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
          console.log("Erreur de login");
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
      .catch(error => { console.error("Erreur attrapée dans getUser", error) });

  };

  function getTerms(user, token) {
    // création de la requête
    console.log("Dans getTerms de coopernet. User = ", user);
    return fetch("https://www.coopernet.fr/memo/themes/" +
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
        console.log("data reçues dans getTerms avant json() :", response);
        if (response.status === 200) return response.json();
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

})();
