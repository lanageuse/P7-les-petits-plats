import { normalizeString } from "../../utils/normalizeString.js";

/**
 * Gère la liste des éléments dans un menu déroulant
 * @class
 */
class DropDownList {
    /**
     * Crée une instance de DropDownList
     * @param {Object} dropdown - L'instance du menu déroulant parent
     */
    constructor(dropdown) {
        this.dataType = dropdown.dropdownType;
        this.dataSubType = dropdown.dropdownSubType;
        this.dropdownList = dropdown.dropdownList;
        this.dropdownItems = dropdown.dropdownItems;
    }

    /**
     * Récupère et traite les éléments à afficher dans le menu déroulant
     * @param {Array} recipes - Liste des recettes à traiter
     * @throws {Error} Si le type de données est inconnu
     * @async
     * @returns {void}
     */
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

    /**
     * Affiche les éléments dans le menu déroulant
     * @param {Array} items - Liste des éléments à afficher
     * @returns {void}
     */
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