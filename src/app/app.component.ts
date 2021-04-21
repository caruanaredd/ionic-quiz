import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent
{
  pages: any = [
    {
      url: '/question',
      name: 'Quiz',
      icon: 'school'
    },
    {
      url: '/profile',
      name: 'Profile',
      icon: 'person'
    },
    {
      url: '/history',
      name: 'History',
      icon: 'checkmark-circle'
    }
  ];

  constructor() {}
}
