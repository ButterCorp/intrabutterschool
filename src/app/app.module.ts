import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { MenuNavComponent } from './menu-nav/menu-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    ClassroomComponent,
    MenuNavComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
