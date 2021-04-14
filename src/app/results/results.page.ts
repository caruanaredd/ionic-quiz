import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage
{
  public iconName: string = 'trophy';
  public iconColor: string = 'warning';
  public heading: string = 'Awesome!';
  public message: string = "You've done well!";

  constructor(
    public quizService: QuizService
  ) { }

  ionViewWillEnter(): void
  {
    // Get the score.
    const percentage = this.quizService.lastScore;
    
    if (percentage >= 1)
    {
      this.iconName = 'trophy';
      this.iconColor = 'warning';
      this.heading = 'Awesome!';
      this.message = 'You got a perfect score!';
    }
    else if (percentage >= 0.5)
    {
      this.iconName = 'ribbon';
      this.iconColor = 'dark';
      this.heading = 'Great work!';
      this.message = `You achieved a score of ${Math.round(percentage * 100)}%`;
    }
    else
    {
      this.iconName = 'sad';
      this.iconColor = 'primary';
      this.heading = 'F';
      this.message = 'You need more practice.';
    }
  }
}
