export default class SidebarToggler {
    #btn;
    static #sidebarWrapper;

    constructor(element)
    {
        this.#btn = element
        this.onClick = this.onClick.bind(this)
        this.#btn.addEventListener('click', this.onClick);
    }

    onClick(e) 
    {
        e.preventDefault();
        e.stopPropagation();
        SidebarToggler.#sidebarWrapper.classList.toggle('compact-sidebar')
    }

    static bind(className, sidebarClass)
    {
        SidebarToggler.#sidebarWrapper = document.querySelector(`.${sidebarClass}`);
        return Array.from(document.querySelectorAll(`.${className}`)).map(element => {
            return new SidebarToggler(element)
        })
    }
}