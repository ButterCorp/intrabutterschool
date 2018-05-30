import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentComponent } from './student/student.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/classroom', pathMatch: 'full' },
  { path: 'students', component: StudentComponent },
  { path: 'classroom', component: ClassroomComponent },
  //{ path: 'docs', component: DocumentsComponent },
  //{ path: 'logout', component: LogoutComponent },
  { path: 'profile/:id', component: ProfileComponent },

]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  declarations: [],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
