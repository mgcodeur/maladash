export default class PasswordEyeToggler {
    /**
     * #element: container of two buttons
     * btnHidePassword (icon eye): if we click on this button, the password is hidden
     * btnShowPassword (icon eye-slash): if we click on this button, the password is shown
     * By default, the password is hidden then eye-slash is shown
     */
    #element;
    #btnHidePassword;
    #btnShowPassword;

    /**
     *
     * @param {HTMLElement} element
     */
    constructor(element) {
        if (!element) return false;

        this.#element = element;
        this.init = this.init.bind(this);
        this.showPassword = this.showPassword.bind(this);
        this.hidePassword = this.hidePassword.bind(this);

        this.init();

        this.#btnHidePassword.addEventListener('click', this.hidePassword);
        this.#btnShowPassword.addEventListener('click', this.showPassword);
    }

    hidePassword() {
        this.#btnHidePassword.classList.add('d-none');
        this.#btnShowPassword.classList.remove('d-none');
        this.#element.closest('.form-group').querySelector('input').setAttribute('type', 'password');
    }

    showPassword() {
        this.#btnShowPassword.classList.add('d-none');
        this.#btnHidePassword.classList.remove('d-none');
        this.#element.closest('.form-group').querySelector('input').setAttribute('type', 'text');
    }

    init() {
        this.#btnHidePassword = this.#element.querySelector('[data-action="hide-password"]');
        this.#btnShowPassword = this.#element.querySelector('[data-action="show-password"]');
    }

    /**
     *
     * @param {string} selector
     * @returns {PasswordEyeToggler[HTMLElement]}
     */
    static all(selector = '.password-eyes') {
        const elements = Array.from(document.querySelectorAll(selector));
        if (!elements.length) return;

        return elements.map((element) => new PasswordEyeToggler(element));
    }
}
