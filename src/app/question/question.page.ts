import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit
{
  public question: any = {
    text: "Ionic is a mobile framework based on Angular.",
    randomize: true,
    answers: [
      {
        text: "True",
        correct: true
      },
      {
        text: "False"
      }
    ]
  };

  // The answer clicked in the list.
  // -1 -> no answer has been chosen.
  public chosenAnswer: number = -1;

  // Whether or not the answer was submitted.
  public submitted: boolean = false;

  constructor() { }

  ngOnInit() {
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
      // reset the chosen answer.
      this.chosenAnswer = -1;
    }
    else
    {
      // change the submitted value to true.
      this.submitted = true;
    }
  }
}
