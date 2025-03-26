/**
 * Affiche le nombre de recettes trouvées dans l'élément HTML dédié
 * @param {number} value - Le nombre de recettes à afficher
 * @returns {void}
 */
export const displayCountResult = (value) => {
    const countWrapper = document.getElementById("count-result")
    countWrapper.textContent = value > 1 ? `${value} recettes` : `${value} recette`
}