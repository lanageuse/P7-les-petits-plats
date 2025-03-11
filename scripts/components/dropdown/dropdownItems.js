import { normalizeString } from "../../utils/normalizeString.js"



export const dropdownUpdateItems = (dropdown, filteredRecipes) => {
    const type = dropdown.dataset.type
    const items = [...dropdown.querySelectorAll("li")]
    const recipes = filteredRecipes

    if (type === 'ingredients') {
        items.forEach(item => {
            const value = normalizeString(item.innerHTML)
            const isInRecipes = recipes.some(recipe => recipe.ingredients.some(
                ing => normalizeString(ing.ingredient).includes(value))
            )
            const IsActive = item.dataset.active === "true"
            if (isInRecipes || IsActive) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        })
    }

    if (type === 'appliance') {
        items.forEach(item => {
            const value = normalizeString(item.innerHTML)
            const isInRecipes = recipes.some(recipe => normalizeString(recipe.appliance).includes(value))
            const IsActive = item.dataset.active === "true"
            if (isInRecipes || IsActive) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        })
    }

    if (type === 'ustensils') {
        items.forEach(item => {
            const value = normalizeString(item.innerHTML)
            const isInRecipes = recipes.some(recipe => recipe.ustensils.some(ustensil => normalizeString(ustensil) === value))
            const IsActive = item.dataset.active === "true"
            if (isInRecipes || IsActive) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        })
    }
}

export const selectItem = (e, updateSearchResults) => {
    const wrapper = document.getElementById('filters-tags');
    if (!e.target.dataset.active) {
        const tag = document.createElement("span");
        tag.classList.add("flex", "justify-between", "items-center", "bg-yellow", "text-gray-900", "text-sm", "font-medium", "p-3", "rounded-lg", "min-w-24", "tag-filter");
        tag.innerHTML = `
            ${e.target.innerHTML}
            <button class="ml-2 text-gray-900 font-bold hover:text-gray-600 focus:outline-none">✕</button>
        `;
        wrapper.appendChild(tag);

        e.target.setAttribute("data-active", "true");
        e.target.classList.add("bg-yellow");

        tagRemoval(tag, e.target, updateSearchResults);
    }
}

export const tagRemoval = (tag, item, updateSearchResults) => {
    const button = tag.querySelector("button");
    button.addEventListener("click", (e) => {
        e.stopPropagation();
        tag.remove();
        item.classList.remove("bg-yellow");
        item.removeAttribute("data-active");
        updateSearchResults()
    });
}