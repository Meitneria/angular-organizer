import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SetUser } from './resource/user/user.actions';
import { UserInfo } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<any>,
  ) {
    this.store.select('user').subscribe(data => this.user = data.user );
  }
  title = 'app';
  user: UserInfo;

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.store.dispatch(new SetUser({ user: user }));
  }
}
