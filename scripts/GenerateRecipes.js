

const GenerateRecipes = () => {
    const recipeContainer = document.getElementById('recipe-list');
    for(let recipe of recipes) {
        AC(recipeContainer, GenerateRecipeInstance(recipe));
    }
}

const GenerateRecipeInstance = (recipe) => {
    let container =  CE('section', { className: 'recipe-container'});
    let img = CE('div', {className: 'recipe-img'});
    let title = CE('p', {className: 'recipe-title', innerText: recipe.name});
    let ingredientlist = '';
    for(let el of recipe.ingredients) {
        ingredientlist = 
            ingredientlist 
            + el.ingredient 
            + (el.quantity ? (
                ': ' 
                + el.quantity
                + (el.unit ? el.unit : '')
            ) : '')
            + '\n'
    }
    let ingredients = CE('p', {className: 'recipe-ingredients', innerText: ingredientlist});
    let time = CE('p', {className: 'recipe-time', innerText: recipe.time + ' min'});
    let description = CE('p', {className: 'recipe-desc', innerText: recipe.description});
    AC(container, img, title, ingredients, time, description);
    return container;
}