const button = document.querySelector("button");
// on donne la référence de la function a appelé plus tard
// nous sommes en asynchrone
button.onclick = function(event) {
  test(event, "toto")
}

function test(event, name) {
  console.log('Bouton cliqué !');
  console.log('event', event);
  console.log('name', name);
}
