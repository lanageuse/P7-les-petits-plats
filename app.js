import Api from './scripts/api/Api.js'
import Recipe from './scripts/models/recipe.js'
import RecipeCard from './scripts/components/recipeCard.js'
import DropDown from './scripts/components/dropdown/Dropdown.js'
import UpdateResult from './scripts/utils/UpdateResult.js'
class Index {
    constructor() {
        this.recipesApi = new Api('./data/recipes.json')
        this.$wrapper = document.getElementById("recipes_wrapper")
        this.recipes = []
        this.filteredRecipes = []
        this.dropdowns = []
    }

    async getRecipes() {
        const recipesData = await this.recipesApi.get()
        this.recipes = recipesData.map(data => new Recipe(data))
        this.filteredRecipes = [...this.recipes]
    }

     async displayCardsRecipes(recipes) {
        this.$wrapper.innerHTML = ''
        recipes.forEach((recipe) => {
            const card = new RecipeCard(recipe)
            const template = card.createCard();
            this.$wrapper.insertAdjacentHTML("beforeend", template);
        })
    }
    async main() {
        await this.getRecipes()
        await this.displayCardsRecipes(this.filteredRecipes)

        document.querySelectorAll('.dropdown').forEach(dropdown => {
            const dropdownInstance = new DropDown(dropdown, this)
            this.dropdowns.push(dropdownInstance)
        })

        this.dropdowns.forEach(dropdown => 
            dropdown.dropDownList.fetchDropdownItems(this.filteredRecipes)
        )

        new UpdateResult(this)

    }
}

export default Index

const app = new Index()
await app.main()