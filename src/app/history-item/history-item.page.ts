import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { NotificationsService } from '../services/notifications.service';
import { StorageService } from '../services/storage.service';
import { HistoryItem } from '../struct/question';

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.page.html',
  styleUrls: ['./history-item.page.scss'],
})
export class HistoryItemPage implements OnInit
{
  // The id of this record.
  @Input('id') id: number = null;

  // The history item being viewed.
  data: HistoryItem = null;

  // The duration of this session.
  duration: number = 0;

  // True if this is a modal window.
  isModal: boolean = false;

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    
    private notifService: NotificationsService,
    private storageService: StorageService
  ) { }

  async ngOnInit()
  {
    // Check if this is a modal window.
    this.modalCtrl.getTop().then(value => this.isModal = value !== undefined);

    // Get the ID.
    if (this.id == null)
    {
      this.id = this.route.snapshot.params['id'];
    }
    
    // Get all the history.
    const history: HistoryItem[] = await this.storageService.get('history') || [];

    if (history.length > this.id)
    {
      this.data = history[this.id];
      this.duration = this.data.endTime - this.data.startTime;
    }
  }

  /**
   * Deletes the item and dismisses the modal or returns to the history page.
   */
  async delete()
  {
    const alert = await this.alertCtrl.create({
      header: "Are you sure?",
      message: "This action is permanent and cannot be undone.",
      buttons: [
        {
          text: "No",
          role: 'cancel'
        },
        {
          text: "Yes",
          handler: async () => {
            // get the data from storage.
            const history: HistoryItem[] = await this.storageService.get('history') || [];

            // delete the array item.
            if (history.length > this.id)
            {
              history.splice(this.id, 1);
            }

            // write the data again.
            await this.storageService.set('history', history);

            // redirect.
            this.notifService.internalNotif("Item deleted.");

            // Redirect if this is a page, dismiss if modal.
            if (this.isModal)
            {
              this.modalCtrl.dismiss({ refresh: true });
            }
            else
            {
              this.router.navigateByUrl("/history", { replaceUrl: true });
            }
          }
        }
      ]
    });
    alert.present();
  }

  /**
   * Closes the modal window.
   */
  closeModal()
  {
    this.modalCtrl.dismiss();
  }
}
