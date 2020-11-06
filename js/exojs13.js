"use strict";
(function () {
  let token = null;

  // instanciation d'un objet XHR
  const req = new XMLHttpRequest();

  // ouverture de la requête asynchrone
  req.open('GET', 'https://www.coopernet.fr/rest/session/token/');

  // envoi de la requête (null parce que la requête n'a pas de corps)
  req.send(null);

  // gestion de l'événement onload
  // attention on passe une référence à la fonction et on ne l'appelle pas directement
  // sion on serait en synchrone : Pas bloquant
  req.onload = function() {
    requestFinished(this, getUser, failed); // callback
  };

  function requestFinished(that, success, failed) {
    if (that.status === 200) {
      // Tout baigne, voici le contenu de la réponse
      console.log("Contenu", that.responseText);
      token = that.responseText;
      success("y","y", token)
    } else {
      // On y est pas encore, voici le statut actuel
      console.log("Statut actuel", that.status, that.statusText);
      failed();
    }
  }

  function getUser(login, pwd, token) {
    console.log("dans getUser");
    // utilisation de fetch
    fetch("https://www.coopernet.fr/user/login?_format=json", {
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
          console.log("user", data.current_user);

          /* return {
            userid: data.current_user.uid,
            userlogin: login,
            userpwd: pwd
          } */

        }
      })
      .catch(error => { console.error("Erreur attrapée dans getUser", error) });

  };
  function failed() {
    console.log('Problème dans la récupération du token');
  }


})();
