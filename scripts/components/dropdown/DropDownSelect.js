class DropDownSelect {
    constructor(dropdown) {
        this.dropdownItems = dropdown.dropdownItems;
        this.wrapper = document.getElementById('filters-tags');
        this.init();
    }

    handleItem(e) {
        if (!e.target.dataset.active) {
            const tag = document.createElement("span");
            tag.classList.add("flex", "justify-between", "items-center", "bg-yellow", "text-gray-900", "text-sm", "font-medium", "p-3", "rounded-lg", "min-w-24", "tag-filter");
            tag.innerHTML = `
                ${e.target.innerHTML}
                <button class="ml-2 text-gray-900 font-bold hover:text-gray-600 focus:outline-none">✕</button>
            `;
            this.wrapper.appendChild(tag);
            e.target.setAttribute("data-active", "true");
            e.target.classList.add("bg-yellow");

            this.handleTag(tag, e.target);
        }
    }

    handleTag(tag, item) {
        const button = tag.querySelector("button");
        button.addEventListener("click", (e) => {
            e.stopPropagation();
            tag.remove();
            item.classList.remove("bg-yellow");
            item.removeAttribute("data-active");
        });
    }

    init() {
        this.dropdownItems.addEventListener("click", (e) => this.handleItem(e));
    }
}

export default DropDownSelect;
