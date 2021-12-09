const suggestionManager = new SuggestionManager();

getRecipeList = () => {
    let list = []
    for (let recipe of recipes) {
        let addRecipe = new Recipe(recipe);
        list.push(addRecipe);
        suggestionManager.addRecipeToIngredients(addRecipe);
        suggestionManager.addRecipeToAppliance(addRecipe);
        suggestionManager.addRecipeToUstensils(addRecipe);
    }
    return list;
}

const recipeList = getRecipeList();

const ingredientSearch = document.getElementById('ingredient-search');
const applianceSearch = document.getElementById('appliance-search');
const ustensilSearch = document.getElementById('ustensils-search');

const specificSearchList = [ingredientSearch, applianceSearch, ustensilSearch];

const globalSearch = document.getElementById('global-search');

const SelectedFilterList = document.getElementsByClassName('selected-filter-list')[0];

const recipeListDom = document.getElementById('recipe-list');

const filterRecipe = (selectedFilterMap) => {
    let showedRecipeList = [];
    if(globalSearch.value.length > 0) {
        showedRecipeList = recipeList.filter(el => {
            let bool = el.recipe.name.toLowerCase().includes(globalSearch.value.toLowerCase());
            bool = bool || el.recipe.ingredients.some(el => el.ingredient.toLowerCase().includes(globalSearch.value.toLowerCase()));
            bool = bool || el.recipe.appliance.toLowerCase().includes(globalSearch.value.toLowerCase());
            bool = bool || el.recipe.ustensils.some(el => el.toLowerCase().includes(globalSearch.value.toLowerCase()))
            return bool;
        });
    } else 
        showedRecipeList = recipeList;

    
    selectedFilterMap?.forEach((value, key) => {
        showedRecipeList = showedRecipeList.filter(el => {
            switch(value.filterType) {
                case FILTER.ingredient :
                    return el.recipe.ingredients.some(el => el.ingredient.includes(value.filterName));
                case FILTER.appliance :
                    return el.recipe.appliance.includes(value.filterName);
                case FILTER.ustensil :
                    return el.recipe.ustensils.some(el => el.includes(value.filterName));
                default:
                    throw new Error('not known filter type');
            }
        });
    });

    if(showedRecipeList.length > 0) {
        suggestionManager.setShowedRecipeList(showedRecipeList);
        recipeListDom.innerHTML = '';
        showedRecipeList.forEach(el => {
            el.showRecipe();
        });
    }
} 

globalSearch.addEventListener('input', (e) => {
    if(globalSearch.value.length > 2) {
        filterRecipe(null);
    }
})

ingredientSearch.addEventListener('click', (e) => {
    ingredientSearch.nextElementSibling.innerHTML = '';
    suggestionManager.openFilter(FILTER.ingredient, e.target.value);
});
applianceSearch.addEventListener('click', (e) => {
    applianceSearch.nextElementSibling.innerHTML = '';
    suggestionManager.openFilter(FILTER.appliance, e.target.value);
});
ustensilSearch.addEventListener('click', (e) => {
    ustensilSearch.nextElementSibling.innerHTML = '';
    suggestionManager.openFilter(FILTER.ustensil, e.target.value);
});

ingredientSearch.addEventListener('input', (e) => {
    ingredientSearch.nextElementSibling.innerHTML = '';
    suggestionManager.openFilter(FILTER.ingredient, e.target.value);
});
applianceSearch.addEventListener('input', (e) => {
    applianceSearch.nextElementSibling.innerHTML = '';
    suggestionManager.openFilter(FILTER.appliance, e.target.value);
});
ustensilSearch.addEventListener('input', (e) => {
    ustensilSearch.nextElementSibling.innerHTML = '';
    suggestionManager.openFilter(FILTER.ustensil, e.target.value);
});

document.addEventListener('click', (e) => {
    suggestionManager.handleOnClickOutside(ingredientSearch, e);
    suggestionManager.handleOnClickOutside(ustensilSearch, e);
    suggestionManager.handleOnClickOutside(applianceSearch, e);
})