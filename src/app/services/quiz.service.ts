import { Injectable } from '@angular/core';
import { Question } from '../struct/question';
import { QUESTIONS } from '../struct/question-data';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService
{
  // The scoring variables.
  private _bestScore: number = 0;
  private _lastScore: number = 0;

  /**
   * Returns the highest score of the quiz.
   */
  public get bestScore(): number
  {
    return this._bestScore / QUESTIONS.length;
  }

  /**
   * Returns the last score submitted.
   */
  public get lastScore(): number
  {
    return this._lastScore / QUESTIONS.length;
  }

  /**
   * Sets the last score variable, and the best score if it is smaller in value.
   */
  public set lastScore(value: number)
  {
    this._lastScore = value;
    if (this._lastScore > this._bestScore)
    {
      this._bestScore = this._lastScore;
    }

    this.storageService.set('lastScore', this._lastScore);
    this.storageService.set('bestScore', this._bestScore);
  }

  /**
   * The number of questions in this service.
   */
  public get count(): number
  {
    return QUESTIONS.length;
  }

  /**
   * GET marks this property as read only.
   */
  public get questions(): Question[]
  {
    return QUESTIONS;
  }

  constructor(
    private storageService: StorageService
  ) {
    this.init();
  }

  /**
   * Initializes the service.
   */
  private async init()
  {
    this._lastScore = await this.storageService.get('lastScore') || 0;
    this._bestScore = await this.storageService.get('bestScore') || 0;
  }
}
