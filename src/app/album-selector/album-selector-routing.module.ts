import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumSelectorPage } from './album-selector.page';

const routes: Routes = [
  {
    path: '',
    component: AlbumSelectorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumSelectorPageRoutingModule {}
