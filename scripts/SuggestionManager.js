const FILTER = {
    ingredient: 'ingredient',
    appliance: 'appliance',
    ustensil: 'ustensils',

}

class SuggestionManager {

    ingredientMap = new Map();
    applianceMap = new Map();
    ustensilsMap = new Map();
    selectedFilterMap = new Map();
    showedRecipeList = [];

    addRecipeToIngredients = (recipe) => {
        for (let ing of recipe.recipe.ingredients) {
            this.ingredientMap.set(ing.ingredient, this.addRecipeToList(this.ingredientMap.get(ing.ingredient), recipe));
        }
    }

    addRecipeToAppliance = (recipe) => {
        this.applianceMap.set(recipe.recipe.appliance, this.addRecipeToList(this.applianceMap.get(recipe.recipe.appliance), recipe));
    }

    addRecipeToUstensils = (recipe) => {
        for (let ust of recipe.recipe.ustensils) {
            this.ustensilsMap.set(ust, this.addRecipeToList(this.ustensilsMap.get(ust), recipe));
        }
    }

    createSuggestionDom = (filter, key) => {
        let label = CE('label', { innerText: key, className: 'suggestion' });
        label.addEventListener('click', (e) => { addFilter(key, filter) });
        AC(document.getElementsByClassName(filter + '-list')[0], label);

    }

    addRecipeToList = (list, recipe) => {
        if (list == null) {
            list = [];
        }
        list.push(recipe);
        return list;
    }

    openFilter = (filter, inputValue) => {
        let map;
        switch (filter) {
            case FILTER.ingredient:
                map = this.ingredientMap;
                break;
            case FILTER.appliance:
                map = this.applianceMap;
                break;
            case FILTER.ustensil:
                map = this.ustensilsMap;
                break;
            default:
                throw new Error('Suggestion.js::openFilter => not possible filter');
        }
        map.forEach((value, key) => {
            let keyList = Array.from(this.selectedFilterMap.keys());
            if (keyList.includes(value)) return;
            if (inputValue && !key.toLowerCase().includes(inputValue.toLowerCase())) return;
            if (this.showedRecipeList.length > 0) {
                if (value.some(item => this.showedRecipeList.includes(item))) {
                    this.createSuggestionDom(filter, key);
                }
            } else {
                this.createSuggestionDom(filter, key);
            }
        })
    }

    handleOnClickOutside = (filterInput, evt) => {
        if (evt.target == filterInput) return;
        if (evt.target == filterInput.parentElement) return;
        if (filterInput.parentElement.contains(evt.target)) return;
        filterInput.nextElementSibling.innerHTML = '';
    }

    addFilter = (filter, filterType) => {
        specificSearchList.forEach(value => {
            value.nextElementSibling.innerHTML = '';
            value.value = '';
        });

        let filterDom = CE('label', { innerText: filter, classList: 'selected-filter ' + filterType, id: filter });
        filterDom.addEventListener('click', (e) => { removeFilter(filter, filterType) });
        AC(SelectedFilterList, filterDom);

        this.selectedFilterMap.set(filter, new SelectedFilter(filter, filterType, filterDom));
        filterRecipe(this.selectedFilterMap);
    }

    removeFilter = (filter) => {
        this.selectedFilterMap.get(filter).html.remove();
        this.selectedFilterMap.delete(filter);
        filterRecipe(this.selectedFilterMap);
    }

    setShowedRecipeList(list) {
        this.showedRecipeList = list;
    }
}