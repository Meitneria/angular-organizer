import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { User, UserInfo, auth } from 'firebase';

import { Store } from '@ngrx/store';
import { SetUser } from '../resource/user/user.actions';

import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(
    private store: Store<any>,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.store.dispatch(new SetUser({ user: user }));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  AuthLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(result => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.SetUserData(result.user);
      })
      .catch(error => {
        console.log(error);
      });
  }

  IsUserAuthorized() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.ngZone.run(() => {
        this.router.navigate(['home']);
      });
    }
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: UserInfo = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      providerId: user.providerId
    };

    return userRef.set(userData, {
      merge: true
    });
  }

  SignOut() {
    this.store.dispatch(new SetUser({ user: null }));
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }
}
