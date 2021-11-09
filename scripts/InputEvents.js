const onclick = (el) => {
    console.log('salut', el);
}

const start = () => {

    const ingredientSearch = document.getElementById('ingredient-search');
    const deviceSearch = document.getElementById('device-search');
    const toolSearch = document.getElementById('tool-search');
    
    const globalSearch = document.getElementById('global-search');
    
    globalSearch.addEventListener('input', (e) => {
        if(globalSearch.value.length > 2) {
            GenerateRecipes();
        }
    })
}