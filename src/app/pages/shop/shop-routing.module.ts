import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopPage } from './shop.page';

const routes: Routes = [
  {
    path: '',
    component: ShopPage
  },  {
    path: 'citrus',
    loadChildren: () => import('./pages/citrus/citrus.module').then( m => m.CitrusPageModule)
  },
  {
    path: 'tropical',
    loadChildren: () => import('./pages/tropical/tropical.module').then( m => m.TropicalPageModule)
  },
  {
    path: 'berry',
    loadChildren: () => import('./pages/berry/berry.module').then( m => m.BerryPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopPageRoutingModule {}
