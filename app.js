import Api from './scripts/api/Api.js'
import Recipe from './scripts/models/recipe.js'
import RecipeCard from './scripts/components/recipeCard.js'
class Index {
    constructor(){
        this.recipesApi = new Api('./data/recipes.json')
        this._recipes = []
        this.$wrapper = document.getElementById("recipes_wrapper")
    }

    async getRecipes(){
        const recipesData = await this.recipesApi.get()
        this._recipes = recipesData.map(data => new Recipe(data))
    }

    async displayCardsRecipes(){
        this._recipes.forEach((recipe) => {
            const card = new RecipeCard(recipe)
            const template = card.createCard();
            this.$wrapper.insertAdjacentHTML("beforeend", template);
        })
    }

    async main(){
        await this.getRecipes()
        await this.displayCardsRecipes()
    }

}

const app = new Index()
app.main()