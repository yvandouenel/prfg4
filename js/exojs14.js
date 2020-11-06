"use strict";
(function () {
  function getToken() {
    return new Promise(function (resolve, reject) {
      if (Math.random() > 0.5) {
        // cas favorable
        const token = "qsdfqsdf";
        resolve(token);
      } else reject(new Error("Problème de token"));
    });
  }
  function getUser() {
    return new Promise(function (resolve, reject) {

      if (Math.random() > 0.5) {
        // cas favorable
        const user = {"name": "Dylan", "firstname": "Bob"};
        resolve(user);
      } else reject(new Error("Problème d'utilisateur"));
    });
  }

  async function getTokenUser() {
    try{
      const token = await getToken();
      // Si j'exécute ce code, c'est que mon token est ok
      const user = await getUser();
       // Si j'exécute ce code, c'est que mon user est ok
      console.log('user', user);
    }
    catch(e) {
      console.log('Erreur : ', e);
    }
  }
  getTokenUser();

  /* const token = getToken()
    .then((token) => {
      console.log('token : ', token);
      return getUser();// ici on peut utiliser getUSer uniquement parceque cette fonction
      // utiliser elle-même le mécanisme des promesses
    })
    .then((user) => {
      console.log('user : ', user);
    })
    .catch(error => {
      console.error("Erreur : ", error.message);
    }); */
})();
