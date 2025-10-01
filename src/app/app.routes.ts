import { Routes } from '@angular/router';

import { DashboardPage } from './pages/dashboard/dashboard.page';
import { ShopPage } from './pages/shop/shop.page';
import { WishlistPage } from './pages/wishlist/wishlist.page';
import { NotificationsPage } from './pages/notifications/notifications.page';
import { AboutPage } from './pages/about/about.page';
import { DevelopersPage } from './pages/developers/developers.page';
import { SettingsPage } from './pages/settings/settings.page';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardPage },
  { path: 'shop', component: ShopPage },
  { path: 'wishlist', component: WishlistPage },
  { path: 'notifications', component: NotificationsPage },
  { path: 'about', component: AboutPage },
  { path: 'developers', component: DevelopersPage },
  { path: 'settings', component: SettingsPage },
];
