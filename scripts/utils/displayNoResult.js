/**
 * Affiche un message d'erreur lorsqu'aucune recette n'est trouvée
 * @param {string} searchValue - La valeur recherchée par l'utilisateur
 * @param {number} countResult - Le nombre de résultats trouvés
 * @returns {void}
 */
export const displayNoResult = (searchValue, countResult) => {
    const resultWrapper = document.getElementById("no-result")
    
    resultWrapper.innerHTML = countResult === 0 ? `
        <div role="alert" class="mt-3 relative flex w-full p-3 text-sm text-white bg-amber-600 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-5 w-5 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path></svg>
            Aucune recette ne contient "<strong>${searchValue}</strong>" vous pouvez chercher « tarteauxpommes», «poisson», etc.
        </div>` : ''
}