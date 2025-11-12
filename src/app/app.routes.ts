import { Routes } from '@angular/router';

import { DashboardPage } from './pages/dashboard/dashboard.page';
import { ShopPage } from './pages/shop/shop.page';
import { WishlistPage } from './pages/wishlist/wishlist.page';
import { NotificationsPage } from './pages/notifications/notifications.page';
import { AboutPage } from './pages/about/about.page';
import { DevelopersPage } from './pages/developers/developers.page';
import { SettingsPage } from './pages/settings/settings.page';
import { LoginPage } from './pages/login/login.page';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'dashboard', component: DashboardPage, canActivate: [authGuard] },
  {   path: 'shop', loadComponent: () => import('./pages/shop/shop.page').then(m => m.ShopPage) },
  { path: 'wishlist', component: WishlistPage, canActivate: [authGuard] },
  { path: 'notifications', component: NotificationsPage, canActivate: [authGuard] },
  { path: 'about', component: AboutPage, canActivate: [authGuard] },
  { path: 'developers', component: DevelopersPage, canActivate: [authGuard] },
  { path: 'settings', component: SettingsPage, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];


