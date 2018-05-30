import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { MenuNavComponent } from './menu-nav/menu-nav.component';
import { SemanticDropdownDirective } from './semantic-dropdown.directive';
import { StudentComponent } from './student/student.component';
import { AppRoutingModule } from './/app-routing.module';
import { ProfileComponent } from './profile/profile.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { HttpClientModule } from '@angular/common/http';
import { SemanticSidebarDirective } from './semantic-sidebar.directive';

@NgModule({
  declarations: [
    AppComponent,
    ClassroomComponent,
    MenuNavComponent,
    SemanticDropdownDirective,
    StudentComponent,
    ProfileComponent,
    SemanticSidebarDirective
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
