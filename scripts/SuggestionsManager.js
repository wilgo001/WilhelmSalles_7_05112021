class SuggestionManager {
    algo

    clearSuggestions = () => {
        let flist = document.getElementsByClassName('filter-list');
        for(let f = 0; f < flist.length; f++) {
            flist[f].innerHTML = '';
        }
    }

    createSuggestionDom = (filter, key, input) => {
        if(key.toLowerCase().includes(input.toLowerCase())) {
            let parent = document.getElementsByClassName(filter + '-list')[0];
            let children = Array.prototype.slice.call(parent.children);
            if(children.some(el => el.innerText == key)) return;
            let label = CE('label', { innerText: key, className: 'suggestion' });
            label.addEventListener('click', (e) => { this.addFilter(key, filter) });
            AC(parent, label);
        }
    }

    addIngredientSuggestions = (e, recipes) => {
        this.clearSuggestions();
        for(let r = 0; r < recipes.length; r++) {
            let ingredients = recipes[r].ingredients;
            for(let i = 0; i < ingredients.length; i++) {
                let ing = ingredients[i].ingredient;
                this.createSuggestionDom(FILTER.ingredient, ing, e.target.value || '');
            }
        }
        e.stopPropagation();
    }

    addApplianceSuggestions = (e, recipes) => {
        this.clearSuggestions();
        for(let r = 0; r < recipes.length; r++) {
            this.createSuggestionDom(FILTER.appliance, recipes[r].appliance, e.target.value || '');
        }
        e.stopPropagation();
    }

    addUstensilsSuggestions = (e, recipes) => {
        this.clearSuggestions();
        for(let r = 0; r < recipes.length; r++) {
            let ustensils = recipes[r].ustensils;
            for(let u = 0; u < ustensils.length; u++) {
                this.createSuggestionDom(FILTER.ustensil, ustensils[u], e.target.value || '');
            }
        }
        e.stopPropagation();
    }

    addFilter = (filter, filterType) => {
        let SelectedFilterList = document.getElementsByClassName('selected-filter-list')[0];
        let filterDom = CE('label', { innerText: filter, classList: 'selected-filter ' + filterType, id: filter });
        filterDom.addEventListener('click', (e) => { this.removeFilter(filter, filterType) });
        AC(SelectedFilterList, filterDom);
        this.algo.showRecipes()
    }

    removeFilter = (filter) => {
        let filterLabel = document.getElementById(filter);
        filterLabel.remove();
        this.algo.showRecipes();
    }

    filterByIngredient = (recipeList) => {
        let filteredList = []
        let filters = document.getElementsByClassName('selected-filter ' + FILTER.ingredient);
        if(filters.length < 1) return recipeList;
        for (let i = 0; i < filters.length; i++) {
            let filter = filters[i].innerText;
            for(let r = 0; r < recipeList.length; r++) {
                let recipe = recipeList[r];
                for (let n = 0; n < recipe.ingredients.length; n++) {
                    if(filter == recipe.ingredients[n].ingredient) {
                        filteredList.push(recipe);
                        break;
                    }
                }
            }
        }
        return filteredList;
    }

    filterByAppliance = (recipeList) => {
        let filteredList = []
        let filters = document.getElementsByClassName('selected-filter ' + FILTER.appliance);
        if(filters.length < 1) return recipeList;
        for (let i = 0; i < filters.length; i++) {
            let filter = filters[i].innerText;
            for(let r = 0; r < recipeList.length; r++) {
                let recipe = recipeList[r];
                if(filter == recipe.appliance) {
                    filteredList.push(recipe);
                }
            }
        }
        return filteredList;
    }

    filterByUstensils = (recipeList) => {
        let filteredList = []
        let filters = document.getElementsByClassName('selected-filter ' + FILTER.ustensil);
        if(filters.length < 1) return recipeList;
        for (let i = 0; i < filters.length; i++) {
            let filter = filters[i].innerText;
            for(let r = 0; r < recipeList.length; r++) {
                let recipe = recipeList[r];
                for (let n = 0; n < recipe.ustensils.length; n++) {
                    if(filter == recipe.ustensils[n]) {
                        filteredList.push(recipe);
                        break;
                    }
                }
            }
        }
        return filteredList;
    }

    emptySelectedFilter = () => {
        return !document.getElementsByClassName('selected-filter-list')[0].hasChildNodes();
    }
}