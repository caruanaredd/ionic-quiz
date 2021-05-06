import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlbumService } from '../services/album.service';
import { Album } from '../struct/gallery';

@Component({
  selector: 'app-album-selector',
  templateUrl: './album-selector.page.html',
  styleUrls: ['./album-selector.page.scss'],
})
export class AlbumSelectorPage implements OnInit
{
  albums: Album[] = [];
  gallery: Album = { name: 'All Photos', photo: '', count: 0 };

  constructor(
    private modalCtrl: ModalController,

    private albumService: AlbumService
  ) { }

  ngOnInit()
  {
    this.albums = this.albumService.getAlbums();

    const photos = this.albumService.getPhotos();
    this.gallery.count = photos.length;

    const randPhoto = photos.sort(() => Math.random() - 0.5).find((p, i) => i == 0);
    // use base64 for photos taken in app
    // or filePath for photos from gallery
    this.gallery.photo = randPhoto!.base64Data || randPhoto!.filePath;
  }

  chooseAlbum(name: string)
  {
    this.modalCtrl.dismiss(name);
  }

  dismiss()
  {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
