class Algo {

    suggestionManager;
    showedRecipes;
    previousSearch;

    constructor(suggestionManager) {
        this.suggestionManager = suggestionManager;
        this.showedRecipes = recipes;
        this.generateListeners();
    }

    refreshRecipes = () => {
        recipesContainer.innerHTML = '';
    }

    showRecipe = (recipe) => {
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

    isRecipeInGlobalSearch = (recipe) => {
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

    showRecipes = () => {
        this.showedRecipes = [];
        for(let r=0; r<recipes.length; r++) {
            let recipe = this.isRecipeInGlobalSearch(recipes[r]);
            if(recipe) this.showedRecipes.push(recipe);
        }
    
        if(this.showedRecipes.length < 1)
        this.showedRecipes = recipes
    
        this.showedRecipes = this.suggestionManager.filterByIngredient(this.showedRecipes);
        this.showedRecipes = this.suggestionManager.filterByAppliance(this.showedRecipes);
        this.showedRecipes = this.suggestionManager.filterByUstensils(this.showedRecipes);
    
        if(globalSearch.value.length < 1 && this.suggestionManager.emptySelectedFilter()) {
            this.showedRecipes = recipes;
        }

        this.refreshRecipes();

        for(let i=0; i<this.showedRecipes.length; i++) {
            this.showRecipe(this.showedRecipes[i]);
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
            this.suggestionManager.addIngredientSuggestions(e, this.showedRecipes);
        })
        
        applianceSearch.addEventListener('click', (e) => {
            this.suggestionManager.addApplianceSuggestions(e, this.showedRecipes);
        })
        
        ustensilSearch.addEventListener('click', (e) => {
            this.suggestionManager.addUstensilsSuggestions(e, this.showedRecipes);
        })
        
        ingredientSearch.addEventListener('input', (e) => {
            this.suggestionManager.addIngredientSuggestions(e, this.showedRecipes)
        })
        
        applianceSearch.addEventListener('input', (e) => {
            this.suggestionManager.addApplianceSuggestions(e, this.showedRecipes);
        })
        
        ustensilSearch.addEventListener('input', (e) => {
            this.suggestionManager.addUstensilsSuggestions(e, this.showedRecipes);
        })
        
        document.addEventListener('click', (e) => {
            this.suggestionManager.clearSuggestions();
        })
    }

}