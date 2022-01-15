class Algo {

    suggestionManager;
    showedRecipes;
    recipeList
    previousSearch;

    constructor(suggestionManager) {
        this.suggestionManager = suggestionManager;
        this.recipeList = this.getRecipeList();
        this.showedRecipes = this.recipeList;
        this.generateListeners();
    }


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


    refreshRecipes = () => {
    recipesContainer.innerHTML = '';
    suggestionManager.setShowedRecipeList(this.recipeList);
    }


    showRecipes = () => {
        if(globalSearch.value.length > 0) {
            this.showedRecipes = this.recipeList.filter(el => {
                let bool = el.recipe.name.toLowerCase().includes(globalSearch.value.toLowerCase());
                bool = bool || el.recipe.ingredients.some(el => el.ingredient.toLowerCase().includes(globalSearch.value.toLowerCase()));
                bool = bool || el.recipe.appliance.toLowerCase().includes(globalSearch.value.toLowerCase());
                bool = bool || el.recipe.ustensils.some(el => el.toLowerCase().includes(globalSearch.value.toLowerCase()))
                return bool;
            });
        } else 
            this.showedRecipes = this.recipeList;

        
        this.suggestionManager.selectedFilterMap?.forEach((value, key) => {
            this.showedRecipes = this.showedRecipes.filter(el => {
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
        
        this.refreshRecipes();
        if(this.showedRecipes.length > 0) {
            suggestionManager.setShowedRecipeList(this.showedRecipes);
            this.showedRecipes.forEach(el => {
                el.showRecipe();
            });
        }
    }

    generateListeners = () => {
        globalSearch.addEventListener('input', (e) => {
            if(globalSearch.value.length > 2 || this.previousSearch) {
                this.previousSearch = globalSearch.value
                this.showRecipes();
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
    }

}



