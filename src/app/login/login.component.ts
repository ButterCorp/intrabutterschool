import { Component, OnInit } from '@angular/core';
import { AuthService, Student } from '../services/auth.service';
import {Router} from "@angular/router";
import { FirestoreService } from '../core/firestore.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  uid: string;
  usernameText: string;
  usernameAvailable: boolean;
  studentsCollection: AngularFirestoreCollection<Student>;
  students: Observable<Student[]>;
  constructor(
    private auth: AuthService,
    private router: Router,
    private afsService: FirestoreService,
    private afs: AngularFirestore
  ) {
  
   }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.uid = user.uid;
    });
  }
  checkeUsername() {
    
    this.studentsCollection =  this.afs.collection('students', ref => ref.where('name', '==', this.usernameText));
    this.students = this.studentsCollection.snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Student;
          const uid = action.payload.doc.id;
          return { 
            uid,
            name: data.name,
            displayName: data.displayName,
            rank: data.rank,
            bio: data.bio,
            active: data.active,
            email: data.email,
            avatar: data.avatar,
          }
        });
      })
    )
    ;

    this.students.subscribe(snapshot => {
      if(snapshot.length == 0) {  
        this.usernameAvailable = true;
      } else {
        this.usernameAvailable = false;
      }
    })
  }
  setName(){
    this.afsService.upsert(`students/${this.uid}`, {username: this.usernameText});
    this.usernameText = '';
    this.getName();
  }
  getName(){
  }
  checkUsername(){
    this.afsService.col$('students', ref => ref.where('name', '==', this.usernameText))
    .subscribe(
      username => {
        this.usernameAvailable = !username
      }
    )
  }
  /*
  signInWithFacebook() {
    this.authService.signInWithFacebook()
    .then((res) => { 
        this.router.navigate(['login'])
      })
    .catch((err) => console.log(err));
  }
  */

}
