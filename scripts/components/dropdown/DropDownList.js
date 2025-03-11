import { normalizeString } from "../../utils/normalizeString.js";

class DropDownList {
    constructor(dropdown) {
        this.dataType = dropdown.dropdownType;
        this.dataSubType = dropdown.dropdownSubType;
        this.dropdownList = dropdown.dropdownList;
        this.dropdownItems = dropdown.dropdownItems;
    }

    async fetchDropdownItems(recipes) {
        const type = this.dataType;
        const subType = this.dataSubType;
        if (!recipes[0]?.hasOwnProperty(type)) {
            throw new Error(`Type de données "${type}" inconnu`);
        }
        let items;
        if (type === "ingredients") {
            // Pour les ingrédients, on récupère les valeurs du sous-type "ingredient"
            items = [...new Set(recipes.flatMap(recipe => recipe[type].map(ing => normalizeString(ing[subType]))))];
        } 
        if (type === "ustensils") {
            // Pour les ustensiles, on récupère directement la liste sans subType
            items = [...new Set(recipes.flatMap(recipe => recipe[type].map(ust => normalizeString(ust))))];
        } 
        if (type === "appliance") {
            // Pour appliance (appareil) qui est une simple valeur
            items = [...new Set(recipes.map(recipe => normalizeString(recipe[type])))];
        }
        this.renderItems(items.sort());
    }

    renderItems(items) {
        this.dropdownItems.innerHTML = '';
        items.forEach((item) => {
            const element = document.createElement("li");
            element.classList.add("block", "px-4", "py-2", "text-sm", "text-gray-900", "hover:bg-yellow");
            element.setAttribute("role", "menuitem");
            element.setAttribute("tabindex", -1);
            element.innerHTML = item;
            this.dropdownItems.appendChild(element);
        });
    }
}

export default DropDownList;
