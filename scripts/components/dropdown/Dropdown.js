import DropDownList from './DropDownList.js';
import DropDownFilter from './DropDownFilter.js';
import DropDownSelect from './DropDownSelect.js';

class DropDown {
    constructor(dropdown) {
        this.dropdown = dropdown;
        this.dropdownInput = this.dropdown.querySelector("input[type='search']");
        this.dropdownButton = this.dropdown.querySelector('button');
        this.dropdownList = this.dropdown.querySelector('.dropdownlist');
        this.dropdownItems = this.dropdown.querySelector('.dropdownitems');
        this.dropdownType = this.dropdown.dataset.type;
        this.dropdownSubType = this.dropdown.dataset.subtype;
        this.isClose = true;

        this.init();
    }

    toggleDropdown() {
        this.dropdownList.classList.toggle("hidden");
        this.isClose = this.dropdownList.classList.contains("hidden");
        this.dropdownButton.setAttribute("aria-expanded", !this.isClose);
        if (!this.isClose) this.dropdownButton.focus();
    }

    clickOutsideDropdown(e) {
        if (!this.dropdown.contains(e.target) && !this.isClose) {
            this.toggleDropdown();
        }
    }

    init() {
        this.dropDownList = new DropDownList(this);
        this.dropDownFilter = new DropDownFilter(this);
        this.dropDownSelect = new DropDownSelect(this);

        this.dropdownButton.addEventListener("click", () => this.toggleDropdown());
        document.addEventListener("click", (e) => this.clickOutsideDropdown(e));
    }
}

export default DropDown;
