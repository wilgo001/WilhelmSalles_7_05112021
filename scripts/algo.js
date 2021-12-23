const suggestionManager = new SuggestionManager();

const filter = {
    ingredient: 'ingredient',
    appliance: 'appliance',
    ustensil: 'ustensils',

}

const showedRecipes = [];

const recipesContainer = document.getElementById('recipe-list');

const ingredientSearch = document.getElementById('ingredient-search');
const applianceSearch = document.getElementById('appliance-search');
const ustensilSearch = document.getElementById('ustensils-search');

const globalSearch = document.getElementById('global-search');

const showRecipe = (recipe) => {
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
    AC(recipesContainer, container);
}

const isRecipeInGlobalSearch = (recipe) => {
    let value = globalSearch.value;
    if(recipe.name.toLowerCase().includes(value.toLowerCase())
    || recipe.appliance.toLowerCase().includes(value.toLowerCase())) {
        return recipe;
    }
    for(let i=0; i<recipe.ingredients.length; i++) {
        let ing = recipe.ingredients[i];
        if(ing.ingredient.toLowerCase().includes(value.toLowerCase())) {
            return recipe;
        }
    }
    for(let u=0; u<recipe.ustensils.length; u++) {
        if(recipe.ustensils[u].toLowerCase().includes(value.toLowerCase())) {
            return recipe;
        }
    }
    return null;
}

const showRecipes = () => {
    for(let r=0; r<recipes.length; r++) {
        let recipe = isRecipeInGlobalSearch(recipes[r]);
        if(recipe) showedRecipes.push(recipe);
    }

    for(let i=0; i<showedRecipes.length; i++) {
        suggestionManager.addSuggestions(showedRecipes[i]);
        showRecipe(showedRecipes[i]);
    }
    
}

const showSuggestion = () => {
    
}

globalSearch.addEventListener('input', (e) => {
    if(globalSearch.value.length > 2) {
        showRecipes();
    }
})