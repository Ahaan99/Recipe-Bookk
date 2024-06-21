document.addEventListener('DOMContentLoaded', () => {
    const recipeForm = document.getElementById('recipe-form');
    const recipeName = document.getElementById('recipe-name');
    const recipeIngredients = document.getElementById('recipe-ingredients');
    const recipeInstructions = document.getElementById('recipe-instructions');
    const recipeType = document.getElementById('recipe-type');
    const recipesContainer = document.getElementById('recipes');
    const apiUrl = 'https://api.edamam.com/api/recipes/v2';
    const appId = '<e89a3d3a>';
    const appKey = '<f81552e125c7b1a7c95d0f6586d5544a>';
  
    function addRecipe(name, ingredients, instructions, type) {
       
        const recipe = document.createElement('div');
        recipe.classList.add('recipe');
  
        const recipeTitle = document.createElement('h3');
        recipeTitle.innerText = name;
        recipe.appendChild(recipeTitle);
  
        const recipeTypeElement = document.createElement('p');
        recipeTypeElement.classList.add('recipe-type');
        recipeTypeElement.innerText = `Type: ${type}`;
        recipe.appendChild(recipeTypeElement);
  
        const recipeIng = document.createElement('p');
        recipeIng.innerText = `Ingredients: ${ingredients}`;
        recipe.appendChild(recipeIng);
  
        const recipeInst = document.createElement('p');
        recipeInst.innerText = `Instructions: ${instructions}`;
        recipe.appendChild(recipeInst);
  
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.classList.add('delete-btn');
        recipe.appendChild(deleteBtn);
  
       
        deleteBtn.addEventListener('click', () => {
            recipesContainer.removeChild(recipe);
        });
  
       
        recipesContainer.appendChild(recipe);
    }
  
    function fetchRecipes(query) {
        const url = `${apiUrl}?type=public&q=${query}&app_id=${appId}&app_key=${appKey}`;
  
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const recipes = data.hits;
                recipesContainer.innerHTML = ''; 
                recipes.forEach(hit => {
                    const recipe = hit.recipe;
                    addRecipe(recipe.label, recipe.ingredientLines.join(', '), 'See instructions on the provided link', 'API Recipe');
                });
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
            });
    }
  
    recipeForm.addEventListener('submit', (e) => {
        e.preventDefault();
  
        const name = recipeName.value;
        const ingredients = recipeIngredients.value;
        const instructions = recipeInstructions.value;
        const type = recipeType.value;
  
        addRecipe(name, ingredients, instructions, type);
  
    
        recipeForm.reset();
    });
  
    fetchRecipes('chicken');
  });
  