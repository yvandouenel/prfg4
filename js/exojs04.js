class Recette {
  constructor(name, ingredients) {
    this.name = name;
    this.ingredients = ingredients;
    this.ingredients_number = ingredients.length;
  }
  timer() {
    console.log('un jour je ferai un truc qui dira quoi faire dans l\'ordre chronologique');
  }
  addIngredient(ingredient) {
    console.log('Dans addIngredient');
    this.ingredients.length = this.ingredients.push(ingredient);
  }
  removeIngredient(ingredient) {
    console.log('Dans removeIngredient');
    // teste si l'ingrédient à enlever est présent
    const ingredient_index = this.ingredients.indexOf(ingredient);
    if(ingredient_index != -1) {
      this.ingredients.splice(ingredient_index, 1);
      this.ingredients_number = this.ingredients.length;
    }
  }
}
const poulet_curry = new Recette("Poulet Curry", ["poulet", "pâte curry"]);
poulet_curry.addIngredient("lait coco");

poulet_curry.removeIngredient("poulet");
console.log('Après avoir supprimé le poulet');
poulet_curry.ingredients.forEach(element => {
  console.log(element);
});
poulet_curry.addIngredient("mayonnaise");

console.log('Après avoir ajouté la mayonnaise');
poulet_curry.ingredients.forEach(element => {
  console.log(element);
});

