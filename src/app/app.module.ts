import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

/* firebase */
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './services/auth.service';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

/* Core module */
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { MenuNavComponent } from './menu-nav/menu-nav.component';
import { SemanticDropdownDirective } from './semantic-dropdown.directive';
import { StudentComponent } from './student/student.component';
import { AppRoutingModule } from './/app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';

import { HttpClientModule } from '@angular/common/http';
import { SemanticSidebarDirective } from './semantic-sidebar.directive';
import { SemanticStickyDirective } from './semantic-sticky.directive';
import { DocumentsComponent } from './documents/documents.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { LikesComponent } from './likes/likes.component';
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';

import { AuthGuard } from './core/auth.guard';
import { FirestoreService } from './core/firestore.service';

import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
@NgModule({
  declarations: [
    AppComponent,
    ClassroomComponent,
    MenuNavComponent,
    SemanticDropdownDirective,
    StudentComponent,
    ProfileComponent,
    SemanticSidebarDirective,
    PostComponent,
    SemanticStickyDirective,
    DocumentsComponent,
    AdminComponent,
    LoginComponent,
    LikesComponent  
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    DialogModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    InputTextModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    CoreModule,
  ],
  providers: [AuthService, AuthGuard, FirestoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
