"use strict";
(function () {
  // instanciation d'un objet XHR
  const req = new XMLHttpRequest();

  // ouverture de la requête asynchrone
  req.open('GET', 'https://www.coopernet.fr/rest/session/token/');

  // envoi de la requête (null parce que la requête n'a pas de corps)
  req.send(null);

  // gestion de l'événement onload
  // attention on passe une référence à la fonction et on ne l'appelle pas directement
  // sion on serait en synchrone
  req.onload = requestFinished;

  function requestFinished() {
    if (this.status === 200) {
      // Tout baigne, voici le contenu de la réponse
      console.log("Contenu", this.responseText);
    } else {
      // On y est pas encore, voici le statut actuel
      console.log("Statut actuel", this.status, this.statusText);
    }
  }

})();
