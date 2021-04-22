import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryItemPageRoutingModule } from './history-item-routing.module';

import { HistoryItemPage } from './history-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryItemPageRoutingModule
  ],
  declarations: [HistoryItemPage]
})
export class HistoryItemPageModule {}
