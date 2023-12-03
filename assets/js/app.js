import FullscreenToggler from './components/FullscreenToggler';
import SidebarNestedMenu from './components/SidebarNestedMenu';
import SidebarToggler from './components/SidebarToggler';
import ThemeModeToggler from './components/ThemeModeToggler';
import PasswordEyeToggler from './components/PasswordEyeToggler';
import TabToggler from './components/TabToggler';

SidebarToggler.listenAllSidebarToggler('sidebar-toggler', 'app-wrapper');
SidebarToggler.listenAllSidebarCloser('sidebar-closer');

ThemeModeToggler.all('[data-switch-to]');
FullscreenToggler.all('.fullscreen-toggler');

SidebarNestedMenu.all('.sidebar-item.has-submenu > .sidebar-link');
PasswordEyeToggler.all('.password-eyes');
TabToggler.all('.x-tab');