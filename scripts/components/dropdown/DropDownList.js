import Api from './../../api/Api.js';

class DropDownList {
    constructor(dropdown) {
        this.recipesApi = new Api('./data/recipes.json');
        this.dataType = dropdown.dropdownType;
        this.dataSubType = dropdown.dropdownSubType;
        this.dropdownList = dropdown.dropdownList;
        this.dropdownItems = dropdown.dropdownItems;
        this.init();
    }

    async fetchDropdownItems() {
        const recipes = await this.recipesApi.get();
        const type = this.dataType;
        const subType = this.dataSubType;
        let items = [];

        if (!recipes[0]?.hasOwnProperty(type)) {
            throw new Error(`Type de données "${type}" inconnu`);
        }

        recipes.forEach((recipe) => {
            if (Array.isArray(recipe[type])) {
                recipe[type].forEach((entry) => {
                    const value = entry[subType] ?? entry;
                    if (!items.includes(value)) items.push(value);
                });
            } else if (!items.includes(recipe[type])) {
                items.push(recipe[type]);
            }
        });

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

    init() {
        this.fetchDropdownItems();
    }
}

export default DropDownList;
