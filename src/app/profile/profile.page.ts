import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
