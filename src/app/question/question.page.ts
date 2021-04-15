import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { QuizService } from '../services/quiz.service';
import { StorageService } from '../services/storage.service';
import { Answer, HistoryItem, Question } from '../struct/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit
{
  private _lockedQuestions: Question[] = [];

  public question: Question = null;

  // The answer clicked in the list.
  // -1 -> no answer has been chosen.
  public chosenAnswer: number = -1;

  // The question number we're currently on.
  private _questionIndex: number = -1;

  // Whether or not the answer was submitted.
  public submitted: boolean = false;

  // The number of answers that were correct.
  private _correctAnswers: number = 0;

  // The starting time of this page.
  private _startTime: number = null;

  // Read-only variable: Quiz progress
  public get progress(): number
  {
    // current question index / total number of questions
    return (this._questionIndex + 1) / this.quizService.count;
  }

  constructor(
    private alertCtrl: AlertController,
    private router: Router,

    private quizService: QuizService,
    private storageService: StorageService
  ) { }

  ngOnInit()
  {
    this.nextQuestion();
  }

  ionViewDidEnter()
  {
    // Register the start time when the page transition ends.
    this._startTime = new Date().getTime();
  }

  /**
   * Returns an answer's highlight color.
   * @param answer The answer to check.
   * @returns The color for that answer.
   */
  getAnswerColor(answer: Answer): string
  {
    // if there was no submission, return null.
    if (!this.submitted) return null;

    // if the answer is correct, return success.
    if (answer.correct) return 'success';

    // if the answer is not correct and is the one the user chose, return danger.
    if (answer == this.question.answers[this.chosenAnswer]) return 'danger';
    
    return null;
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

    // Unset all the chosen properties for all answers.
    this.question.answers.map(a => a.chosen = false);

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
        this.save();
        this.quizService.lastScore = this._correctAnswers;
        this.router.navigateByUrl('/results', { replaceUrl: true });
      }
    }
    else
    {
      // change the submitted value to true.
      this.submitted = true;

      //  Mark the answer as chosen and record it.
      this.question.answers[this.chosenAnswer].chosen = true;
      this._lockedQuestions.push(this.question);

      // check if the answer is correct.
      if (this.question != null &&
          this.question.answers[this.chosenAnswer].correct)
      {
        this._correctAnswers++;
      }
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
            this.save();
            this.router.navigateByUrl('/profile', { replaceUrl: true });
          }
        }
      ]
    });
    
    alert.present();
  }

  /**
   * Saves the quiz progress.
   */
  async save()
  {
    // get the history if it exists.
    const history: HistoryItem[] = await this.storageService.get('history') || [];

    // add the current session to the history.
    history.push({
      startTime: this._startTime,
      endTime: new Date().getTime(),
      questions: this._lockedQuestions,
      score: this._correctAnswers / this.quizService.count,
      complete: this._lockedQuestions.length == this.quizService.count,
    });

    // set the history record again.
    this.storageService.set('history', history);
  }
}
