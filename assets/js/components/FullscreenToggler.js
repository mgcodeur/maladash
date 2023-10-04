import { __rootElement } from "../_variables";

export default class FullscreenToggler {
    #btnToggler;
    
    /**
     * 
     * @param {HTMLElement} btnToggler 
     * @returns {void}
     */
    constructor(btnToggler)
    {
        if(!btnToggler) {
            return false;
        }
        this.onClick = this.onClick.bind(this)

        this.#btnToggler = btnToggler;

        this.#btnToggler.addEventListener('click', this.onClick)
    }

    /**
     * 
     * @param {Event} e
     * @return {void} 
     */
    onClick(e)
    {
        e.preventDefault();
        e.stopPropagation();

        const __isFullScreen = document.fullscreenElement;

        if(!__isFullScreen) {
            __rootElement.requestFullscreen();
        }
        else {
            document.exitFullscreen();
        }
    }

    /**
     * 
     * @param {string} className 
     * @returns {FullscreenToggler[HTMLElement]}
     */
    static bind(className)
    {
        const fullscreenTogglers = Array.from(document.querySelectorAll(className));

        if(!fullscreenTogglers.length)
        {
            return false;
        }

        return fullscreenTogglers.map((fsToggler) => {
            return new FullscreenToggler(fsToggler);
        });
    }
}