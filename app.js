/**
 * @fileoverview Point d'entrée principal de l'application de recettes
 */

import Api from './scripts/api/Api.js'
import Recipe from './scripts/models/recipe.js'
import RecipeCard from './scripts/components/recipeCard.js'
import DropDown from './scripts/components/dropdown/Dropdown.js'
import UpdateResult from './scripts/utils/UpdateResult.js'

/**
 * @class Index
 * @description Classe principale qui gère l'initialisation et la coordination de l'application
 */
class Index {
    /**
     * @constructor
     * @description Initialise les propriétés principales de l'application
     */
    constructor() {
        this.recipesApi = new Api('./data/recipes.json')
        this.$wrapper = document.getElementById("recipes_wrapper")
        this.recipes = []
        this.filteredRecipes = []
        this.dropdowns = []
    }

    /**
     * @async
     * @method getRecipes
     * @description Récupère les données des recettes depuis l'API et les transforme en instances de Recipe
     * @returns {Promise<void>}
     */
    async getRecipes() {
        const recipesData = await this.recipesApi.get()
        this.recipes = recipesData.map(data => new Recipe(data))
        this.filteredRecipes = [...this.recipes]
    }

    /**
     * @async
     * @method displayCardsRecipes
     * @description Affiche les cartes de recettes dans le conteneur principal
     * @param {Array<Recipe>} recipes - Tableau des recettes à afficher
     * @returns {Promise<void>}
     */
     async displayCardsRecipes(recipes) {
        this.$wrapper.innerHTML = ''
        recipes.forEach((recipe) => {
            const card = new RecipeCard(recipe)
            const template = card.createCard();
            this.$wrapper.insertAdjacentHTML("beforeend", template);
        })
    }

    /**
     * @async
     * @method main
     * @description Méthode principale qui initialise l'application
     * - Charge les recettes
     * - Affiche les cartes de recettes
     * - Initialise les menus déroulants
     * - Configure le système de mise à jour des résultats
     * @returns {Promise<void>}
     */
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