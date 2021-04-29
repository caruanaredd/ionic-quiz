import { Component, OnInit } from '@angular/core';
import { AlertController, IonItemSliding, ModalController } from '@ionic/angular';
import { HistoryItemPage } from '../history-item/history-item.page';
import { NotificationsService } from '../services/notifications.service';
import { StorageService } from '../services/storage.service';
import { HistoryItem } from '../struct/question';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage
{
  // The quiz history.
  history: HistoryItem[] = [];

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,

    private notifService: NotificationsService,
    private storageService: StorageService
  ) { }

  async ionViewWillEnter()
  {
    this.history = await this.storageService.get('history') || [];
  }

  /**
   * Clears the history from storage.
   */
  async clear()
  {
    const alert = await this.alertCtrl.create({
      header: "Are you sure?",
      message: "Deleting your history is a permanent action and cannot be undone.",
      buttons: [
        {
          text: "No",
          role: 'cancel'
        },
        {
          text: "Yes",
          handler: async () => {
            // Remove the history item from storage.
            await this.storageService.remove('history');

            // Reload the history array to refresh the page.
            this.history = await this.storageService.get('history') || [];
          }
        }
      ]
    });

    alert.present();
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

  /**
   * Handles the slide event.
   * @param event The item event, use $event in HTML.
   * @param index The record index.
   * @param item The Ionic Sliding Item, use ViewChild #option
   */
  async onSlide(event: any, index: number, item: IonItemSliding)
  {
    // Event ratio 1 is sliding towards the left (exposing the eye icon).
    if (event.detail.ratio >= 1)
    {
      // Returns the top modal interface.
      this.modalCtrl.getTop().then(async value => {
        if (value !== undefined) return;

        const modal = await this.modalCtrl.create({
          component: HistoryItemPage,
          componentProps: {
            'id': index
          }
        });

        modal.onWillDismiss().then(async response => {
          if (response.data && response.data.refresh)
          {
            this.history = await this.storageService.get('history') || [];
          }
        });

        setTimeout(() => item.close(), 100);
        modal.present();
      });
    }
  }
}
