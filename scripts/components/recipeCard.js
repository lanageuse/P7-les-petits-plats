class recipeCard {
    constructor(recipe) {
        this._recipe = recipe
    }

    createCard() {
        const card = `<article class="relative rounded-xl overflow-hidden shadow-lg flex flex-col">
                <div class="relative">
                    <img class="w-full  max-h-[250px] min-h-[250px] lg:max-h-[350px] sm:min-h-[350px] object-cover object-center"
                        src="./assets/images/recipes/${this._recipe.image}"
                        alt="${this._recipe.name} - ${this._recipe.time} min">
                    <div class="text-xs absolute top-1 right-1 bg-yellow px-3 py-1.5 text-gray-900 mt-3 mr-3 rounded-4xl">
                        ${this._recipe.time} min
                    </div>
                </div>
                <div class=" relative px-6 py-6 mb-auto flex flex-col gap-8">
                    <div>
                        <h2 class="font-title text-lg inline-block mb-4">${this._recipe.name}</h2>
                        <h3 class="text-gray-500 text-xs font-semibold tracking-widest my-2">RECETTE</h3>
                        <p class="text-gray-900 text-sm">
                        ${this._recipe.description.slice(0, 182)}
                        </p>
                    </div>
                    <div>
                        <h4 class="text-gray-500 text-xs font-semibold tracking-widest my-2">INGRÉDIENTS</h4>
                        <ul class="columns-2 gap-4 text-sm">
                        ${this._recipe.ingredients.map(ing => 
                            `<li class="mb-4">${ing.ingredient}<br /><span class="text-gray-400">${ing.quantity || ''} ${ing.unit || ''}</span></li>`).join("")}
                        </ul>
                    </div>
                </div>
            </article>`

        return card
    }
}

export default recipeCard