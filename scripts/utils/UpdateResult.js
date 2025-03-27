import { normalizeString } from "./normalizeString.js"
import { displayCountResult } from "./displayCountResult.js"
import { dropdownUpdateItems, selectItem } from "../components/dropdown/dropdownItems.js"
import { displayNoResult } from "./displayNoResult.js"

/**
 * Gère la mise à jour des résultats de recherche et des filtres
 * @class
 */
class UpdateResult {
    /**
     * Crée une instance de UpdateResult
     * @param {Object} index - L'instance contenant les recettes et les méthodes d'affichage
     */
    constructor(index) {
        this.index = index
        this.searchBar = document.getElementById("default-search")
        this.dropdowns = document.querySelectorAll('.dropdown')
        this.dropdownItems = document.querySelectorAll('.dropdown li')
        this.minValue = 2
        this.init()
    }

    /**
     * Initialise les écouteurs d'événements pour la recherche et les filtres
     * @returns {void}
     */
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

     /**
     * Récupère les éléments sélectionnés d'un type de filtre donné
     * @param {string} type - Le type de filtre (ingredients, appliance, ustensils)
     * @returns {Array<string>} Liste des valeurs sélectionnées normalisées
     */
    getSelectedItems(type) {
        return [...document.querySelectorAll(`.dropdown[data-type="${type}"] li`)]
            .filter(item => item.dataset.active)
            .map(item => normalizeString(item.innerHTML))
    }

    /**
     * Met à jour les résultats de recherche en fonction des filtres actifs
     * @returns {void}
     */
    updateByFilters() {
        const ingredientsValues = this.getSelectedItems("ingredients")
        const applianceValues = this.getSelectedItems("appliance")
        const ustensilsValues = this.getSelectedItems("ustensils")

        this.index.filteredRecipes = this.index.filteredRecipes.filter( recipe => {
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

            return filteredIngredients && filteredAppliance && filteredUstensils
        })
    }

    /**
     * @method updateSearchResults
     * @description Met à jour les résultats de recherche en fonction de la valeur de recherche et des filtres
     * Filtre les recettes par nom, description et ingrédients
     * Met à jour l'affichage des cartes de recettes et des dropdowns
     */
    updateSearchResults() {
        const searchValue = normalizeString(this.searchBar.value)
        this.index.filteredRecipes = []

        for (let i = 0; i < this.index.recipes.length; i++) {
            if (normalizeString(this.index.recipes[i].name).length === 0 || normalizeString(this.index.recipes[i].name).indexOf(searchValue) !== -1) {
                this.index.filteredRecipes.push(this.index.recipes[i])
                continue;
            }
            if (normalizeString(this.index.recipes[i].description).length === 0 || normalizeString(this.index.recipes[i].description).indexOf(searchValue) !== -1) {
                this.index.filteredRecipes.push(this.index.recipes[i])
                continue;
            }
            for (let a = 0; a < this.index.recipes[i].ingredients.length; a++) {
                if (normalizeString(this.index.recipes[i].ingredients[a].ingredient).length === 0 || normalizeString(this.index.recipes[i].ingredients[a].ingredient).indexOf(searchValue) !== -1) {
                    this.index.filteredRecipes.push(this.index.recipes[i])
                }
            }
        }

        this.updateByFilters()

        this.index.displayCardsRecipes(this.index.filteredRecipes);

        // Met à jour chaque les items des dropdowns
        this.dropdowns.forEach(dropdown => {
            dropdownUpdateItems(dropdown, this.index.filteredRecipes)
        });

        // Met à jour chaque le nombre de résultats
        displayCountResult(this.index.filteredRecipes.length)

    }

}
export default UpdateResult
