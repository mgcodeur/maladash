import { __rootElement, __systemMode } from '../_variables';

export default class ThemeModeToggler {
    #switcher;
    #switchTo;

    /**
     * @param {HTMLElement} switcher
     */
    constructor(switcher) {
        if (!switcher) {
            return false;
        }
        this.#switcher = switcher;
        this.onclick = this.onclick.bind(this);

        this.#switchTo = this.#switcher.getAttribute('data-switch-to');
        this.#switcher.addEventListener('click', this.onclick);
    }

    /**
     *
     * @param {Event} e
     * @returns {void | boolean}
     */
    onclick(e) {
        e.preventDefault();
        e.stopPropagation();

        if (this.#switchTo === 'auto') {
            this.#switchTo = __systemMode;
        }

        const isAlreadyCurrentMode = __rootElement.classList.contains(`${this.#switchTo}-mode`);

        if (isAlreadyCurrentMode) {
            return false;
        }

        __rootElement.removeAttribute('class');
        __rootElement.classList.add(`${this.#switchTo}-mode`);

        localStorage.setItem('_mode', `${this.#switchTo}-mode`);
    }

    /**
     *
     * @param {string} selector
     * @returns {ThemeModeToggler[HTMLElement]}
     */
    static bind(selector) {
        const switchers = Array.from(document.querySelectorAll(selector));

        if (!switchers.length) {
            return false;
        }

        return switchers.map(function (switcher) {
            return new ThemeModeToggler(switcher);
        });
    }
}
