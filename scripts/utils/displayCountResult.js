export const displayCountResult = (value) => {
    const countWrapper = document.getElementById("count-result")
    const countResult = value
    countWrapper.innerHTML = countResult > 1 ? countResult + ' recettes' : countResult + ' recette'
}