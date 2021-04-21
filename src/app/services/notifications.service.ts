import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService
{
  constructor(
    private toastCtrl: ToastController
  ) { }

  /**
   * Displays an internal toast notification.
   * @param message The message to display.
   */
  async internalNotif(message: string)
  {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });

    toast.present();
  }
}
