import { Injectable } from '@angular/core';

// Import the plugins from Capacitor and use only Storage.
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService
{
  constructor() { }

  /**
   * Sets a data pair.
   * @param key The data key.
   * @param value The data value.
   */
  async set(key: string, value: any): Promise<void>
  {
    await Storage.set({
      key: key,
      value: JSON.stringify(value)
    });
  }

  /**
   * Gets the data value using its key.
   * @param key The data key.
   * @returns The assigned data value.
   */
  async get(key: string): Promise<any>
  {
    const item = await Storage.get({ key: key });
    return JSON.parse(item.value);
  }

  /**
   * Removes a record from storage.
   * @param key The data key.
   */
  async remove(key: string): Promise<void>
  {
    await Storage.remove({ key: key });
  }

  /**
   * Removes all data from storage.
   */
  async clear(): Promise<void>
  {
    await Storage.clear();
  }
}
