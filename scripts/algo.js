const filter = {
    ingredient: 'ingredient',
    appliance: 'appliance',
    ustensil: 'ustensils',

}

const onclick = (el) => {
    console.log('salut', el);
}

const start = () => {

    const ingredientSearch = document.getElementById('ingredient-search');
    const applianceSearch = document.getElementById('appliance-search');
    const ustensilSearch = document.getElementById('ustensils-search');
    
    const globalSearch = document.getElementById('global-search');
    
    globalSearch.addEventListener('input', (e) => {
        if(globalSearch.value.length > 2) {
            GenerateRecipes();
        }
    })
}


const addSuggestionToFilterInput = (filterType, suggestion) => {
    let filter = document.getElementsByClassName(filterType + '-list filter-list')[0];
    let suggestionDom = CE('label', {className: 'suggestion-filter', innnerText: suggestion});
    suggestionDom.addEventListener('click', (e) => {onClickSuggestion(filterType, suggestion)});
    AC(filter, suggestion);
}

const onClickSuggestion = (filterType, suggestion) => {

}