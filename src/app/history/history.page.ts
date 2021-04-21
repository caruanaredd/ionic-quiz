import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../services/notifications.service';
import { StorageService } from '../services/storage.service';
import { HistoryItem } from '../struct/question';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit
{
  // The quiz history.
  history: HistoryItem[] = [];

  constructor(
    private notifService: NotificationsService,
    private storageService: StorageService
  ) { }

  async ngOnInit()
  {
    this.history = await this.storageService.get('history') || [];
  }

  /**
   * Deletes an item from the history.
   * @param index The index to delete.
   */
  async delete(index: number)
  {
    // remove an item from the history in this component.
    this.history.splice(index, 1);
    
    // write it to the database.
    await this.storageService.set('history', this.history);

    // Show a confirmation message.
    this.notifService.internalNotif("Item deleted.");
  }
}
