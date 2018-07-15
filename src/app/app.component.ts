import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Location } from '@angular/common';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import {FirestoreService } from './core/firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ibs';
  items: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.items = db.collection('items').valueChanges();
  }

  ngOnInit() {
  }

}
