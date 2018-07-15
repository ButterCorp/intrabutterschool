import { NgModule } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FirestoreService } from './firestore.service';

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [AuthService, FirestoreService]
})
export class CoreModule { }
