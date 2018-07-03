import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';

export interface Student {
  uid: string;
  name: string;
  displayName: string;
  email: string;
  rank: string;
  bio?: string;
  avatar?: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root',
}
)
export class AuthService {

  user: Observable<Student>;
  private userDetails: firebase.User = null;

  constructor(
     private _firebaseAuth: AngularFireAuth,
     private afs: AngularFirestore,
     private router: Router
    ) {

    this.user = this._firebaseAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<Student>(`students/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      }));
  }

  signInWithFacebook() {
    const provider =  new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }
  private oAuthLogin(provider) {
    return this._firebaseAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }

  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`students/${user.uid}`);
    const data: Student = {
      
      uid: user.uid,
      name: user.name || '',
      rank: user.rank|| 'Newbie',
      bio: user.bio || '',
      active: user.active || true,
      email: user.email,
      displayName: user.displayName,
      avatar: user.photoURL|| 'http://i67.tinypic.com/2u4ojn6.jpg',

    }

    return userRef.set(data, { merge: true })

  }

  isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/login']));
  }
}
