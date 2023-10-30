import { __bsGridBreakpoints } from '../_variables';

export default class SidebarNestedMenu {
    #menu;

    /**
     *
     * @param {HTMLElement} menu
     */
    constructor(menu) {
        this.#menu = menu;
        this.onMenuClick = this.onMenuClick.bind(this);

        this.#menu.addEventListener('click', this.onMenuClick);
    }

    /**
     *
     * @param {Event} event
     */
    onMenuClick(event) {
        event.preventDefault();
        const __sidebarIsCompact = document.querySelector('.app-wrapper').classList.contains('compact-sidebar');
        const isLowerThanMd = window.innerWidth < __bsGridBreakpoints.md;
        const menu = this.#menu.parentElement;
        const nestedSubmenus = Array.from(menu.querySelectorAll('.has-submenu'));
        
        const needCloseAllSubmenus = nestedSubmenus.length && menu.classList.contains('show');

        if (__sidebarIsCompact && !isLowerThanMd) {
            return;
        }

        if (needCloseAllSubmenus) {
            nestedSubmenus.forEach((submenu) => {
                submenu.classList.remove('show');
            });
            menu.classList.remove('show');

            return;
        }

        menu.classList.toggle('show');
        return;
    }

    /**
     *
     * @param {string} selector
     * @returns {SidebarNestedMenu[HTMLElement]}
     */
    static bind(selector) {
        const menus = Array.from(document.querySelectorAll(selector));

        if (!menus.length) {
            return false;
        }

        return menus.map((menu) => new SidebarNestedMenu(menu));
    }
}
