import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { QuizService } from '../services/quiz.service';
import { Question } from '../struct/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit
{
  public question: Question = null;

  // The answer clicked in the list.
  // -1 -> no answer has been chosen.
  public chosenAnswer: number = -1;

  // The question number we're currently on.
  private _questionIndex: number = -1;

  // Whether or not the answer was submitted.
  public submitted: boolean = false;

  constructor(
    private alertCtrl: AlertController,
    private router: Router,

    private quizService: QuizService
  ) { }

  ngOnInit()
  {
    this.nextQuestion();
  }

  /**
   * Loads the next question or ends the quiz.
   */
  nextQuestion(): void
  {
    // Go to the next question.
    this._questionIndex++;

    // Set the current question again.
    this.question = this.quizService.questions[this._questionIndex];

    // Reset the chosen answer.
    this.chosenAnswer = -1;

    // if the answers should be randomized, randomize them.
    if (this.question.randomize)
    {
      this.question.answers = this.question.answers.sort(_ => 0.5 - Math.random());
    }
  }

  /**
   * Toggles between submitted and not submitted.
   */
  onSubmitAnswer(): void
  {
    if (this.submitted)
    {
      // change the submitted value to false.
      this.submitted = false;
      
      // if the next question exists, load it.
      if (this._questionIndex < this.quizService.questions.length - 1)
      {
        // load the next question
        this.nextQuestion();
      }
      // if not, redirect to the profile page.
      else
      {
        this.router.navigateByUrl('/profile', { replaceUrl: true });
      }
    }
    else
    {
      // change the submitted value to true.
      this.submitted = true;
    }
  }

  /**
   * This function shows an alert to quit the quiz.
   */
  async quit()
  {
    // This code waits (await) for the alert to be
    // created before moving on.
    const alert = await this.alertCtrl.create({
      header: "Quit Quiz",
      message: "Would you like to stop here?",
      buttons: [
        {
          text: "No",
          role: 'cancel'
        },
        {
          text: "Yes",
          handler: () => {
            this.router.navigateByUrl('/profile', { replaceUrl: true });
          }
        }
      ]
    });
    
    alert.present();
  }
}
