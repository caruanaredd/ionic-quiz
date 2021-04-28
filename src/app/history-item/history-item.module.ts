import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryItemPageRoutingModule } from './history-item-routing.module';

import { HistoryItemPage } from './history-item.page';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryItemPageRoutingModule,
    PipesModule
  ],
  declarations: [HistoryItemPage]
})
export class HistoryItemPageModule {}
