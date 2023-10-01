import { __bsGridBreakpoints } from '../_variables';

export default class SidebarToggler {
    #btnToggler;
    #btnCloser;
    static #sidebarWrapper;

    /**
     * toggler and closer btn can be null
     * @param {HTMLElement} toggler the toggler btn
     * @param {HTMLElement} closer the sidebar closer btn
     * @returns {void}
     */
    constructor(toggler = null, closer = null) {
        if (!toggler && !closer) return false;

        this.#btnToggler = toggler;
        this.#btnCloser = closer;
        this.onClickToggler = this.onClickToggler.bind(this);
        this.onClickCloser = this.onClickCloser.bind(this);
        this.onScreenResize = this.onScreenResize.bind(this);

        if (this.#btnCloser) {
            this.#btnCloser.addEventListener('click', this.onClickCloser);
        }

        if (this.#btnToggler) {
            this.#btnToggler.addEventListener('click', this.onClickToggler);
        }

        window.addEventListener('resize', this.onScreenResize);
    }

    /**
     * @param {Event} e
     * @return {boolean | void}
     */
    onClickToggler(e) {
        e.preventDefault();
        e.stopPropagation();
        const isLowerThanMd = window.innerWidth < __bsGridBreakpoints.md;

        if (isLowerThanMd) {
            SidebarToggler.#sidebarWrapper.classList.toggle('open-sidebar');
            return false;
        }

        SidebarToggler.#sidebarWrapper.classList.toggle('compact-sidebar');
    }

    /**
     * @param {Event} e
     * @return {void}
     */
    onClickCloser(e) {
        e.preventDefault();
        e.stopPropagation();
        SidebarToggler.#sidebarWrapper.classList.toggle('open-sidebar');
    }

    /**
     *
     * @param {Event} e
     * @return {void}
     */
    onScreenResize(e) {
        const isLowerThanMd = e.target.innerWidth < __bsGridBreakpoints.md;

        if (isLowerThanMd) {
            SidebarToggler.#sidebarWrapper.classList.remove('open-sidebar');
        }
    }

    /**
     *
     * @param {string} className
     * @param {string} sidebarClass
     * @returns {SidebarToggler[HTMLElement]}
     */
    static listenAllSidebarToggler(className, sidebarClass) {
        SidebarToggler.#sidebarWrapper = document.querySelector(`.${sidebarClass}`);
        const sidebarTogglers = Array.from(document.querySelectorAll(`.${className}`));
        if (!sidebarTogglers.length) {
            return false;
        }
        return sidebarTogglers.map((toggler) => {
            return new SidebarToggler(toggler, null);
        });
    }

    /**
     *
     * @param {string} className
     * @returns {SidebarToggler[HTMLElement]}
     */
    static listenAllSidebarCloser(className) {
        const sidebarClosers = Array.from(document.querySelectorAll(`.${className}`));

        if (!sidebarClosers.length) {
            return false;
        }

        return sidebarClosers.map((closerBtn) => {
            return new SidebarToggler(null, closerBtn);
        });
    }
}
