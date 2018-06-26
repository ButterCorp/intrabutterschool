import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentComponent } from './student/student.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { DocumentsComponent } from './documents/documents.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';

import { AuthGuardService } from './services/auth-guard.service'

const routes: Routes = [
  { path: '', redirectTo: '/classroom', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'students', component: StudentComponent, canActivate: [AuthGuardService] },
  { path: 'classroom', component: ClassroomComponent, canActivate: [AuthGuardService] },
  { path: 'docs', component: DocumentsComponent, canActivate: [AuthGuardService] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService] },
  //{ path: 'logout', component: LogoutComponent },
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuardService] },

]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  declarations: [],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
