import { normalizeString } from "../../utils/normalizeString.js";

class DropDownSearch {
    constructor(dropdown) {
        this.input = dropdown.dropdownInput;
        this.dropdownList = dropdown.dropdownList;
        this.init();
    }

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

    init() {
        this.input.addEventListener("input", (e) => this.searchDropDown(e));
    }
}

export default DropDownSearch;
