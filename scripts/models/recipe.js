/**
 * Représente une recette de cuisine
 * @class
 */
class Recipe {
    /**
     * Crée une instance de Recipe
     * @param {Object} data - Les données de la recette
     * @param {number} [data.id] - L'identifiant unique de la recette
     * @param {string} [data.image] - Le nom du fichier image de la recette
     * @param {string} [data.name] - Le nom de la recette
     * @param {number} [data.servings] - Le nombre de portions
     * @param {Array<Object>} [data.ingredients] - La liste des ingrédients
     * @param {number} [data.time] - Le temps de préparation en minutes
     * @param {string} [data.description] - La description détaillée de la recette
     * @param {string} [data.appliance] - L'appareil nécessaire pour la préparation
     * @param {Array<string>} [data.ustensils] - La liste des ustensiles nécessaires
     */
    constructor(data) {
        this.id = data.id || undefined
        this.image = data.image || undefined
        this.name = data.name || undefined
        this.servings = data.servings || undefined
        this.ingredients = data.ingredients || undefined
        this.time = data.time || undefined
        this.description = data.description || undefined
        this.appliance = data.appliance || undefined
        this.ustensils = data.ustensils || undefined
    }
}

export default Recipe