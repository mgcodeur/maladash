export default class TabToggler {
    static #selector;
    #tab;
    #tabMenus;
    #clickedTabMenu;
    #tabName;

    /**
     * 
     * @param {HTMLElement} tab 
     */
    constructor(tab)
    {
        if (!tab) return false;

        this.#tab = tab;
        this.getTabMenus = this.getTabMenus.bind(this);
        this.getTabName = this.getTabName.bind(this);
        this.listenTabMenus = this.listenTabMenus.bind(this);
        this.onTabMenuClick = this.onTabMenuClick.bind(this);
        this.displayOnlyActiveTab = this.displayOnlyActiveTab.bind(this);
        this.setClickedTabMenuActive = this.setClickedTabMenuActive.bind(this);
        this.showTargetTabContent = this.showTargetTabContent.bind(this);
        this.persistTab = this.persistTab.bind(this);


        this.#tabMenus = this.getTabMenus();
        this.#tabName = this.getTabName();

        
        this.displayOnlyActiveTab();
        this.listenTabMenus();
    }

    displayOnlyActiveTab()
    {
        const url = new URL(window.location.href);
        const tabName = this.#tabName;
        const tabId = url.searchParams.get(tabName) || url.searchParams.get('tab');

        this.#tabMenus.forEach((tabMenu) => {
            const tabMenuIsActive = tabMenu.classList.contains('active');
            const targetTabId = tabMenu.getAttribute('data-tab-target');
            const targetTab = this.#tab.querySelector(`#${targetTabId}`);

            !tabMenuIsActive ? targetTab.classList.add('d-none') : targetTab.classList.remove('d-none');
        });

        if(tabId) {
            this.#tabMenus.forEach((tabMenu) => {
                const tabMenuId = tabMenu.getAttribute('data-tab-target');
                const tabMenuIsActive = tabMenuId === tabId;

                tabMenuIsActive ? tabMenu.classList.add('active') : tabMenu.classList.remove('active');
            });

            this.#tab.querySelectorAll('[data-tab-target]').forEach((tab) => {
                const tabContentId = tab.getAttribute('data-tab-target');
                const tabContent = this.#tab.querySelector(`#${tabContentId}`);
                const tabContentIsActive = tabContentId === tabId;

                tabContentIsActive ? tabContent.classList.remove('d-none') : tabContent.classList.add('d-none');
            });
        }
    }

    getTabMenus()
    {
        return this.#tab.querySelectorAll('[data-tab-target]');
    }

    getTabName()
    {
        return this.#tab.getAttribute('data-tab-name');
    }

    listenTabMenus()
    {
        this.#tabMenus.forEach((tabMenu) => {
            tabMenu.addEventListener('click', this.onTabMenuClick);
        });
    }

    onTabMenuClick(e)
    {
        e.preventDefault();
        e.stopPropagation();

        this.#clickedTabMenu = e.currentTarget;
        const targetTabId = this.#clickedTabMenu.getAttribute('data-tab-target');
        const targetTabContent = this.#tab.querySelector(`#${targetTabId}`);

        this.setClickedTabMenuActive();
        this.showTargetTabContent(targetTabContent);      
        this.persistTab(targetTabId);  
    }

    setClickedTabMenuActive()
    {
        this.#tabMenus.forEach((tabMenu) => {
            const currentTabCanBeActive = tabMenu === this.#clickedTabMenu;

            if(currentTabCanBeActive) {
                tabMenu.classList.add('active');
            }
            else {
                tabMenu.classList.remove('active');
            }
        });
    }

    showTargetTabContent(targetTabContent)
    {
        this.#tab.querySelectorAll('[data-tab-target]').forEach((tab) => {
            const tabId = tab.getAttribute('data-tab-target');
            const tabContent = this.#tab.querySelector(`#${tabId}`);
            const canShowCurrentTab = tabContent === targetTabContent;

            if(canShowCurrentTab) {
                tabContent.classList.remove('d-none');
            }
            else {
                tabContent.classList.add('d-none');
            }
        });
    }

    persistTab(targetTabId)
    {
        const url = new URL(window.location.href);
        
        if(this.#tabName) {
            url.searchParams.set(this.#tabName, targetTabId);
        }
        else {
            url.searchParams.set('tab', targetTabId);
        }

        window.history.replaceState({}, '', url);
    }

    /**
     * 
     * @param {string} selector 
     * @returns {TabToggler[HTMLElement]}
     */
    static all(selector = '.x-tab') {
        TabToggler.#selector = selector;

        const tabs = Array.from(document.querySelectorAll(selector));
        if (!tabs.length) return;

        return tabs.map((tab) => new TabToggler(tab));
    }
}