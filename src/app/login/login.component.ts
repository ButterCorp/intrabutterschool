import { Component, OnInit } from '@angular/core';
import { AuthService, Student } from '../services/auth.service';
import { Router } from "@angular/router";
import { FirestoreService } from '../core/firestore.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', "./../../../node_modules/font-awesome/css/font-awesome.css"]
})
export class LoginComponent implements OnInit {
  uid: string;
  usernameText: string;
  usernameAvailable: boolean;
  studentsCollection: AngularFirestoreCollection<Student>;
  students: Observable<Student[]>;
  studentFriendsList: any;
  friendsCount: number;
  hasUsernameValue: boolean;

  /* Closables */
  closableWelcome: boolean;
  closableFriendsMessage: boolean;
  constructor(
    private auth: AuthService,
    private router: Router,
    private afsService: FirestoreService,
    private afs: AngularFirestore
  ) {
    this.auth.user.subscribe(user => {
      if (user) {
        console.log("loggin in");
        this.uid = user.uid;
        if(this.uid){
        this.hasUsername();
          
        }
      }
    });
  }

  ngOnInit() {
    this.closableWelcome = false;
    this.closableFriendsMessage = false;
    console.log("closable welcome" +this.closableWelcome);
  }
  setName() {
    this.afsService.upsert(`students/${this.uid}`, { username: this.usernameText });
    this.usernameText = '';
    this.getFriendsList();
  }
  getFriendsList() {
    this.auth.getFacebookFriendsList().subscribe(
      (data) => {
        this.studentFriendsList = data;
        this.friendsCount = this.studentFriendsList.summary['total_count'];
      }

    );
  }
  hasUsername() {
    this.hasUsernameValue = false;
    this.afs.collection('students/').doc(this.uid).ref.get().then(
      (documentSnapshot) => {
        if(documentSnapshot.exists){
          if(documentSnapshot.data().username){
            this.hasUsernameValue = true;
            console.log(documentSnapshot.data().username);
            console.log(this.hasUsernameValue);
          }
        }
        else{
          console.log("Document not found");
        }
      }
    );
  }
  checkUsername() {
    this.studentsCollection = this.afs.collection('students', ref => ref.where('username', '==', this.usernameText));
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
      if (snapshot.length == 0) {
        this.usernameAvailable = true;
      } else {
        this.usernameAvailable = false;
      }
    })

  }
}
