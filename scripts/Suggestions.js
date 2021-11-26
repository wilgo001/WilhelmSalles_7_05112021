class SelectedFilter {
    filterType;
    filterName;
    html;

    constructor(filterName, filterType, html) {
        this.filterName = filterName;
        this.filterType = filterType;
        this.html = html;
    }
}

const FILTER = {
    ingredient: 'ingredient',
    appliance: 'appliance',
    ustensil: 'ustensils',

}

let ingredientMap = new Map();
let applianceMap = new Map();
let ustensilsMap = new Map();
let selectedFilterMap = new Map();

const addRecipeToIngredients = (recipe) => {
    for(let ing of recipe.recipe.ingredients) {
        ingredientMap.set(ing.ingredient, addRecipeToList(ingredientMap.get(ing.ingredient), recipe));
    }
}

const addRecipeToAppliance = (recipe) => {
    applianceMap.set(recipe.recipe.appliance, addRecipeToList(applianceMap.get(recipe.recipe.appliance), recipe));
}

const addRecipeToUstensils = (recipe) => {
    for(let ust of recipe.recipe.ustensils) {
        ustensilsMap.set(ust, addRecipeToList(ustensilsMap.get(ust), recipe));
    }
}

const createSuggestionDom = (filter, key) => {
    let label = CE('label', {innerText: key, className: 'suggestion'});
    label.addEventListener('click', (e) => {addFilter(key, filter)});
    AC(document.getElementsByClassName(filter+'-list')[0], label);
    
}

const addRecipeToList = (list, recipe) => {
    if(list == null) {
        list = [];
    }
    list.push(recipe);
    return list;
}

const openFilter = (filter, inputValue) => {
    let map;
    switch(filter) {
        case FILTER.ingredient :
            map = ingredientMap;
            break;
        case FILTER.appliance :
            map = applianceMap;
            break;
        case FILTER.ustensil :
            map = ustensilsMap;
            break;
        default :
            throw new Error('Suggestion.js::openFilter => not possible filter');
    }
    map.forEach((value, key) => {
        let keyList = Array.from(selectedFilterMap.keys());
        if(keyList.includes(value)) return;
        if(inputValue && !key.toLowerCase().includes(inputValue.toLowerCase())) return;
        if(showedRecipeList.length > 0) {
            if(value.some(item => showedRecipeList.includes(item))) {
                createSuggestionDom(filter, key);
            }
        } else {
            createSuggestionDom(filter, key);
        }
    })
}

const handleOnClickOutside = (filterInput, evt) => {
    if(evt.target == filterInput) return;
    if(evt.target == filterInput.parentElement) return;
    if(filterInput.parentElement.contains(evt.target)) return;
    filterInput.nextElementSibling.innerHTML = '';
}

const addFilter = (filter, filterType) => {
    specificSearchList.forEach(value => {
        value.nextElementSibling.innerHTML = '';
        value.value = '';
    });

    let filterDom = CE('label', {innerText: filter, classList: 'selected-filter ' + filterType, id:filter});
    filterDom.addEventListener('click', (e) => {removeFilter(filter, filterType)});
    AC(SelectedFilterList, filterDom);

    selectedFilterMap.set(filter, new SelectedFilter(filter, filterType, filterDom));
    filterRecipe();
}

const removeFilter = (filter) => {
    selectedFilterMap.get(filter).html.remove();
    selectedFilterMap.delete(filter);
    filterRecipe();
}