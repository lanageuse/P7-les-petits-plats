import DropDownList from './DropdownList.js';
import DropDownSearch from './DropdownSearch.js';

/**
 * Gère le comportement d'un menu déroulant
 * @class
 */
class DropDown {
    /**
     * Crée une instance de DropDown
     * @param {HTMLElement} dropdown - L'élément DOM du menu déroulant
     * @param {Object} index - L'objet contenant les recettes filtrées
     */
    constructor(dropdown, index) {
        this.index = index;
        this.dropdown = dropdown;
        this.dropdownInput = this.dropdown.querySelector("input[type='search']");
        this.dropdownButton = this.dropdown.querySelector('button');
        this.dropdownList = this.dropdown.querySelector('.dropdownlist');
        this.dropdownItems = this.dropdown.querySelector('.dropdownitems');
        this.dropdownType = this.dropdown.dataset.type;
        this.dropdownSubType = this.dropdown.dataset.subtype;
        this.isClose = true;

        this.dropDownList = new DropDownList(this, this.index.filteredRecipes);
        this.dropDownSearch = new DropDownSearch(this);

        this.init();
    }

    /**
     * Bascule l'état d'affichage du menu déroulant
     * @returns {void}
     */
    toggleDropdown() {
        this.dropdownList.classList.toggle("hidden");
        this.isClose = this.dropdownList.classList.contains("hidden");
        this.dropdownButton.setAttribute("aria-expanded", !this.isClose);
        if (!this.isClose) this.dropdownButton.focus();
    }

    /**
     * Gère le clic en dehors du menu déroulant
     * @param {Event} e - L'événement de clic
     * @returns {void}
     */
    clickOutsideDropdown(e) {
        if (!this.dropdown.contains(e.target) && !this.isClose) {
            this.toggleDropdown();
        }
    }

    /**
     * Initialise les écouteurs d'événements du menu déroulant
     * @returns {void}
     */
    init() {
        this.dropdownButton.addEventListener("click", () => this.toggleDropdown());
        document.addEventListener("click", (e) => this.clickOutsideDropdown(e));
    }
}

export default DropDown;