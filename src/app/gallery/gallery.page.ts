import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlbumSelectorPage } from '../album-selector/album-selector.page';
import { AlbumService } from '../services/album.service';
import { Photo } from '../struct/gallery';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit
{
  photos: Photo[] = [];
  title: string = 'Gallery';

  constructor(
    private modalCtrl: ModalController,

    private albumService: AlbumService
  ) { }

  async ngOnInit()
  {
    // waits for the album service to start.
    await this.albumService.init();
    this.photos = this.albumService.getPhotos();
  }

  chooseImage(photo: Photo)
  {
    this.modalCtrl.dismiss(photo);
  }

  dismiss()
  {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  getPhotoUri(photo: Photo): string
  {
    if (photo.base64Data) return `url(${photo.base64Data})`;
    if (photo.webViewPath) return `url(${photo.webViewPath})`;
    if (photo.filePath) return `url(${photo.filePath})`;
    return 'url(assets/shapes.svg)';
  }

  async openAlbums()
  {
    const modal = await this.modalCtrl.create({
      component: AlbumSelectorPage
    });

    modal.onWillDismiss().then(response => {
      if (response.role == 'cancel') return;

      this.photos = this.albumService.getPhotos(response.data);
      this.title = response.data;
    });

    modal.present();
  }

  takePhoto()
  {
    this.albumService.takePhoto();
  }
}
