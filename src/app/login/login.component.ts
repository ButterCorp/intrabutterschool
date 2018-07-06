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
  constructor(
    private auth: AuthService,
    private router: Router,
    private afsService: FirestoreService,
    private afs: AngularFirestore
  ) {
  }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      if (user != null) {
        console.log("loggin in");
        this.uid = user.uid;
        this.getFriendsList();
      }
    });
  }
  setName() {
    this.afsService.upsert(`students/${this.uid}`, { username: this.usernameText });
    this.usernameText = '';
  }
  getFriendsList() {
    this.auth.getFacebookFriendsList().subscribe(
      (data) => {
        this.studentFriendsList = data;
        console.log(this.studentFriendsList.summary['total_count']);
      }

    );
  }
  checkUsername() {
    this.afsService.col$('students', ref => ref.where('username', '==', this.usernameText))
      .subscribe(
        username => {
          this.usernameAvailable = !username
        }
      )
  }

}
