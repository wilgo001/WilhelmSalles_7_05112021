

const GenerateRecipes = () => {
    const recipeContainer = document.getElementById('recipe-list');
    for(let recipe of recipes) {
        AC(recipeContainer, GenerateRecipeInstance(recipe));
    }
}