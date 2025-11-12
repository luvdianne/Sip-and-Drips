import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'dashboard', component: DashboardPage, canActivate: [AuthGuard] },
  { path: 'shop', loadChildren: () => import('./pages/shop/shop.module').then(m => m.ShopPageModule) },
  { path: 'wishlist', loadChildren: () => import('./pages/wishlist/wishlist.module').then(m => m.WishlistPageModule) },
  { path: 'notifications', loadChildren: () => import('./pages/notifications/notifications.module').then(m => m.NotificationsPageModule) },
  { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule) },
  { path: 'developers', loadChildren: () => import('./pages/developers/developers.module').then(m => m.DevelopersPageModule) },
  { path: 'settings', loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }