const FILTER = {
    ingredient: 'ingredient',
    appliance: 'appliance',
    ustensil: 'ustensils',

}

const recipesContainer = document.getElementById('recipe-list');

const ingredientSearch = document.getElementById('ingredient-search');
const applianceSearch = document.getElementById('appliance-search');
const ustensilSearch = document.getElementById('ustensils-search');
const specificSearchList = [ingredientSearch, applianceSearch, ustensilSearch];

const globalSearch = document.getElementById('global-search');

const SelectedFilterList = document.getElementsByClassName('selected-filter-list')[0];

const suggestionManager = new SuggestionManager();
const algo = new Algo(suggestionManager);
suggestionManager.algo = algo;

document.addEventListener("DOMContentLoaded", (e) => {
    algo.showRecipes();
});