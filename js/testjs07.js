
// Fonction anonyme immédiate ou IIFES
let getI = (function() {
  var i = 12;
  function getI() {
    return i;
  }
  return getI;
})();
