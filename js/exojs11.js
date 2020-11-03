"use strict";
(function() {
  console.log('dans le script convertisseur');
  // Récupération des éléments du formulaire
  let input_euro = document.querySelector("#euro");
  let input_dollar = document.querySelector("#dollar");

  // récupération de l'élément formulaire
  const form = document.getElementById("form-convert");
  // Gestion de l'événement de soumission du formulaire 
  form.onsubmit = function (event) {
    // supression du rechargement de la page  
    // qui est le comportement par défaut 
    event.preventDefault();

    let val_euro = input_euro.value;
    let val_dollar = input_dollar.value;

    if(val_euro) {
      input_dollar.value = (val_euro / 0.86).toFixed(2);
    } else {
      input_euro.value = (val_dollar * 0.86).toFixed(2);
    }

  }
})();

/* (function () {
    console.log("dans le script convertisseur");
    // Récupération des éléments du formulaire
    let input_euro = document.getElementById("euro");
    let input_dollar = document.getElementById("dollar");

    // récupération de l'élément formulaire
    const form = document.getElementById("form-convert");

    // Gestion de l'événement de soumission du formulaire 
    form.onsubmit = function (event) {
        // supression du rechargement de la page  
        // qui est le comportement par défaut 
        event.preventDefault();
        
        // teste si le champ euro n'est pas vide
        if(input_euro.value) {
            console.log("Input euro renseigné");
            input_dollar.value = convert(input_euro.value, "dollar").toFixed(2);
        } 
        // teste si le champ dollar n'est pas vide
        if(input_dollar.value) {
            console.log("Input dollar renseigné");
            input_euro.value = convert(input_dollar.value, "euro").toFixed(2);
        }

        // Dans le cas où l'internaute entre un input qui n'est pas un nombre
        // écrire en dessous du formulaire un averstissement qui demande à entrer
        // un nombre    

    }
    // Gestion des événements focus sur le champ euro
    input_euro.onfocus = function(event) {
        console.log("aprés un focus sur le champ euro");
        // on remet à rien le champ dollar
        input_dollar.value = "";
    }
    // Gestion des événements focus sur le champ dollar
    input_dollar.onfocus = function(event) {
        console.log("aprés un focus sur le champ dollar");
        // on remet à rien le champ euro
        input_euro.value = "";
    }

    /**
     * Permet de convertir en euro si le deuxième argument est "euro"
     * ou de convertir en dollar si le deuxième argument est "dollar"
     * @param {number} amount - montant
     * @param {string} currency - resultat attendu dans la monnaie "currency"
     
    function convert(amount, currency) {
        let result = 0;
        if (currency == "euro") {
            result = (amount * 0.86);
        } else result = (amount / 0.86);

        return result;
    }
})(); */