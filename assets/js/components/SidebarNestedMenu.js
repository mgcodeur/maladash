
export default class SidebarNestedMenu {
    #menu;
    
    /**
     * 
     * @param {HTMLElement} menu 
     */
    constructor(menu)
    {
        this.#menu = menu;
        this.onMenuClick = this.onMenuClick.bind(this);

        this.#menu.addEventListener('click', this.onMenuClick)
    }

    /**
     * 
     * @param {Event} event 
     */
    onMenuClick(event)
    {
        event.preventDefault();
        const __sidebarIsCompact = document.querySelector('.app-wrapper').classList.contains('compact-sidebar');

        if(!__sidebarIsCompact) {
            this.#menu.parentElement.classList.toggle('show');
        }
    }

    /**
     * 
     * @param {string} selector 
     * @returns {SidebarNestedMenu[HTMLElement]}
     */
    static bind(selector)
    {
        const menus = Array.from(document.querySelectorAll(selector))

        if(!menus.length) {
            return false;
        }

        return menus.map(menu => new SidebarNestedMenu(menu));
    }
}