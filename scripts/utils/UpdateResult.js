import { normalizeString } from "./normalizeString.js"
import { displayCountResult } from "./displayCountResult.js"
import { dropdownUpdateItems, selectItem } from "../components/dropdown/dropdownItems.js"
import { displayNoResult } from "./displayNoResult.js"

class UpdateResult {
    constructor(index) {
        this.index = index
        this.searchBar = document.getElementById("default-search")
        this.dropdowns = document.querySelectorAll('.dropdown')
        this.dropdownItems = document.querySelectorAll('.dropdown li')
        this.minValue = 2
        this.init()
    }


    init() {
        this.searchBar.addEventListener("input", (e) => {
            if (e.target.value.length > this.minValue || e.target.value.length === 0) {
                this.updateSearchResults()
                displayNoResult(e.target.value, this.index.filteredRecipes.length)
            }
        })
        this.searchBar.addEventListener("keydown", (e) => {
            if (e.key == 'Enter' && e.target.value.length >= this.minValue) {
                e.preventDefault();
                window.scrollTo(0, 750)
            }
        })

        this.dropdownItems.forEach(item => {
            item.addEventListener("click", e => {
                selectItem(e, () => this.updateSearchResults())
                this.updateSearchResults();
            })
        })

        displayCountResult(this.index.filteredRecipes.length)
    }

    getSelectedItems(type) {
        return [...document.querySelectorAll(`.dropdown[data-type="${type}"] li`)]
            .filter(item => item.dataset.active)
            .map(item => normalizeString(item.innerHTML))
    }

    updateSearchResults() {
        const searchValue = normalizeString(this.searchBar.value)
        const ingredientsValues = this.getSelectedItems("ingredients")
        const applianceValues = this.getSelectedItems("appliance")
        const ustensilsValues = this.getSelectedItems("ustensils")

        this.index.filteredRecipes = this.index.recipes.filter(recipe => {
            const searchBar = searchValue.length === 0 ||
                normalizeString(recipe.name).includes(searchValue) ||
                normalizeString(recipe.description).includes(searchValue) ||
                recipe.ingredients.some(ing => normalizeString(ing.ingredient).includes(searchValue))

            const filteredIngredients = ingredientsValues.length === 0 ||
                ingredientsValues.every(value =>
                    recipe.ingredients.some(ing =>
                        normalizeString(ing.ingredient).includes(value))
                )

            const filteredAppliance = applianceValues.length === 0 ||
                applianceValues.every(value =>
                    normalizeString(recipe.appliance).includes(value)
                )

            const filteredUstensils = ustensilsValues.length === 0 ||
                ustensilsValues.every(value =>
                    recipe.ustensils.some(ust =>
                        normalizeString(ust).includes(value)
                    )
                )

            return searchBar && filteredIngredients && filteredAppliance && filteredUstensils
        })

        this.index.displayCardsRecipes(this.index.filteredRecipes);

        // Met à jour chaque dropdown existant avec les nouveaux résultats
        this.dropdowns.forEach(dropdown => {
            dropdownUpdateItems(dropdown, this.index.filteredRecipes)
        });

        // Met à jour chaque le nombre de résultats
        displayCountResult(this.index.filteredRecipes.length)

    }

}
export default UpdateResult