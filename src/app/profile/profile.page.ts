import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit
{
  // The user's name.
  public name: string = "Redd";

  // The user's surname.
  public surname: string = "Caruana";

  constructor(
    public quizService: QuizService,
    private storageService: StorageService
  ) { }

  async ngOnInit()
  {
    this.name = await this.storageService.get('name'); // || "Redd";
    this.surname = await this.storageService.get('surname'); // || "Caruana";
  }

  /**
   * Sets the data value for a specified key.
   * @param key The storage key.
   * @param e The input event.
   */
  onChange(key: string, e: any): void
  {
    this.storageService.set(key, e.detail.value);
  }
}
