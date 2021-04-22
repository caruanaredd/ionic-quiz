import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryItemPage } from './history-item.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryItemPageRoutingModule {}
