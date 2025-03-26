import { normalizeString } from "../../utils/normalizeString.js";

/**
 * Gère la fonctionnalité de recherche dans un menu déroulant
 * @class
 */
class DropDownSearch {
    /**
     * Crée une instance de DropDownSearch
     * @param {Object} dropdown - L'instance du menu déroulant parent
     */
    constructor(dropdown) {
        this.input = dropdown.dropdownInput;
        this.dropdownList = dropdown.dropdownList;
        this.init();
    }

    /**
     * Filtre les éléments du menu déroulant en fonction de la saisie utilisateur
     * @param {Event} e - L'événement de saisie
     * @returns {void}
     */
    searchDropDown(e) {
        const value = normalizeString(e.target.value)
        const items = this.dropdownList.querySelectorAll("li");

        items.forEach(item => {
            const text = item.innerHTML.toLowerCase();
            if (value.length >= 3) {
                item.classList.toggle("hidden", !text.includes(value));
            } else {
                item.classList.remove("hidden");
            }
        });
    }

    /**
     * Initialise l'écouteur d'événement pour la recherche
     * @returns {void}
     */
    init() {
        this.input.addEventListener("input", (e) => this.searchDropDown(e));
    }
}

export default DropDownSearch;