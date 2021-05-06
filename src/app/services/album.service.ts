import { Injectable } from '@angular/core';
import { Album, Photo } from '../struct/gallery';
import { GALLERY } from '../struct/gallery-data';

import { Plugins, CameraResultType, CameraSource, CameraPhoto, FilesystemDirectory } from '@capacitor/core';
import { StorageService } from './storage.service';
const { Camera, Filesystem } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AlbumService
{
  photos: Photo[] = [];

  constructor(
    private storageService: StorageService
  ) { }

  async init()
  {
    this.photos = [
      ... await this.storageService.get('photos') || [],
      ... GALLERY
    ];
  }

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

    // Save the photo in the device folder -> not working in Chrome
    const imageFile = await this.savePicture(capture);

    // Add the new photo in the array
    this.photos.unshift(imageFile);

    // Update the records in the app storage
    const photos = await this.storageService.get('photos') || [];
    photos.unshift(imageFile);
    await this.storageService.set('photos', photos);
  }

  private async savePicture(photo: CameraPhoto): Promise<Photo>
  {
    // Convert photo to a base64 format, using the Filesystem API.
    const base64data = await this.readAsBase64(photo);

    // DEVICE ONLY - save the image file.
    const fileName = `${new Date().getTime()}.jpg`;
    const file = await Filesystem.writeFile({
      path: fileName,
      data: base64data,
      directory: FilesystemDirectory.Data
    });

    // Return the photo data.
    return {
      filePath: `${FilesystemDirectory.Data}/${fileName}`,
      webViewPath: photo.webPath,
      base64Data: base64data
    }
  }

  /**
   * Converts a camera photo to base64 data.
   * @param photo The camera photo.
   */
  private async readAsBase64(photo: CameraPhoto)
  {
    // Fetch the photo file and read as a blob.
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  /**
   * Converts an image file to base64.
   * @param blob The blob data.
   */
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    
    // define a file reader.
    const reader = new FileReader();

    // if there's an error, reject
    reader.onerror = reject;

    // when it's complete, resolve/label as successful
    reader.onload = () => {
      resolve(reader.result);
    };

    // read the file as a data URL
    reader.readAsDataURL(blob);
  });
}
