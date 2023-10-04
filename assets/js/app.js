import FullscreenToggler from './components/FullscreenToggler';
import SidebarNestedMenu from './components/SidebarNestedMenu';
import SidebarToggler from './components/SidebarToggler';
import ThemeModeToggler from './components/ThemeModeToggler';

SidebarToggler.listenAllSidebarToggler('sidebar-toggler', 'app-wrapper');
SidebarToggler.listenAllSidebarCloser('sidebar-closer');

ThemeModeToggler.bind('[data-switch-to]');
FullscreenToggler.bind('.fullscreen-toggler')

SidebarNestedMenu.bind('.sidebar-item.has-submenu > .sidebar-link');