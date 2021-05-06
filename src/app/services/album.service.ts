import { Injectable } from '@angular/core';
import { Album, Photo } from '../struct/gallery';
import { GALLERY } from '../struct/gallery-data';

import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
const { Camera } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AlbumService
{
  photos: Photo[] = GALLERY;

  constructor() { }

  /**
   * Gets the basic album data from photos.
   */
  getAlbums(): Album[]
  {
    // map -> extracts the album names from the array
    // filter -> extracts unique items from the names
    const names = this.photos.map(photo => photo.album).filter((value, index, array) => value && array.indexOf(value) === index);

    // find -> returns the first array item that matches the condition.
    // filter -> returns all items that match the condition.
    const albums: Album[] = names.map(name => {
      return {
        name: name,
        photo: this.photos.find(photo => photo.album == name).filePath,
        count: this.photos.filter(photo => photo.album == name).length
      }
    });

    return albums;
  }

  /**
   * Returns the photo gallery.
   * @param album The album name [OPTIONAL]
   */
  getPhotos(album?: string): Photo[]
  {
    if (album) return this.photos.filter(photo => photo.album == album) || [];
    return this.photos;
  }

  /**
   * Takes a photo.
   */
  async takePhoto()
  {
    const capture = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
  }
}
