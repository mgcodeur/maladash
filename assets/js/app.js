import SidebarToggler from './components/SidebarToggler';
import ThemeModeToggler from './components/ThemeModeToggler';

SidebarToggler.listenAllSidebarToggler('sidebar-toggler', 'app-wrapper');
SidebarToggler.listenAllSidebarCloser('sidebar-closer');

ThemeModeToggler.bind('[data-switch-to]');