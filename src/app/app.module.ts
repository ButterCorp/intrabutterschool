import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { MenuNavComponent } from './menu-nav/menu-nav.component';
import { SemanticDropdownDirective } from './semantic-dropdown.directive';
import { StudentComponent } from './student/student.component';
import { AppRoutingModule } from './/app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { HttpClientModule } from '@angular/common/http';
import { SemanticSidebarDirective } from './semantic-sidebar.directive';
import { SemanticStickyDirective } from './semantic-sticky.directive';
import { DocumentsComponent } from './documents/documents.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { LikesComponent } from './likes/likes.component';

import { DialogModule } from 'primeng/dialog';

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
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
