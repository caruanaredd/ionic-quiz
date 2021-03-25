import { Injectable } from '@angular/core';
import { Question } from '../struct/question';
import { QUESTIONS } from '../struct/question-data';

@Injectable({
  providedIn: 'root'
})
export class QuizService
{
  /**
   * GET marks this property as read only.
   */
  public get questions(): Question[]
  {
    return QUESTIONS;
  }

  constructor() { }
}
