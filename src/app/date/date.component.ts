import { AuthService } from '../services/auth.service.service';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';

import { UserInfo } from 'firebase';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent {
  constructor(
    private authService: AuthService,
    private location: Location,
    private store: Store<{ data }>
  ) {
    this.store.select('user').subscribe(data => this.user = data.user );
  }


  today: number = Date.now();
  user: UserInfo;
  goBack() {
    this.location.back();
  }
  logOut() {
    this.authService.SignOut();
  }
}
