import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';

interface Student {
  uid: string;
  name: string;
  displayName: string;
  email: string;
  rank: string;
  bio?: string;
  avatar?: string;
  active: boolean;
}

@Injectable()
export class AuthService {

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(
     private _firebaseAuth: AngularFireAuth,
     private afs: AngularFirestore,
     private router: Router
    ) {

    this.user = _firebaseAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<firebase.User>(`students/${user.uid}`).valueChanges()
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
      name: user.name,
      rank: user.rank,
      bio: user.bio,
      active: user.active,
      email: user.email,
      displayName: user.displayName,
      avatar: user.avatar,

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
