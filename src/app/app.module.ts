import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { MenuNavComponent } from './menu-nav/menu-nav.component';
import { SemanticDropdownDirective } from './semantic-dropdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    ClassroomComponent,
    MenuNavComponent,
    SemanticDropdownDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
