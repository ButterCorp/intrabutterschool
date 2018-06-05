import { BrowserModule } from '@angular/platform-browser';
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
<<<<<<< HEAD
import { SemanticModalBasicDirective } from './semantic-modal-basic.directive';
import { SemanticModalSmallDirective } from './semantic-modal-small.directive';
=======
>>>>>>> bcfe62845a10b3a608b17129f333f4134b1bee6e

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
    LikesComponent,
<<<<<<< HEAD
    SemanticModalBasicDirective,
    SemanticModalSmallDirective,
=======
>>>>>>> bcfe62845a10b3a608b17129f333f4134b1bee6e
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
