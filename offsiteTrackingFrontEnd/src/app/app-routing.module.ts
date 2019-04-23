import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { MyScheduleComponent } from './my-schedule/my-schedule.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { GeospatialComponent } from './geospatial/geospatial.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './guards/auth.guard';
import { PasswordComponent } from './password/password.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: EmployeeComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'password', component: PasswordComponent, canActivate: [AuthGuard] },
  { path: 'Schedule', component: ScheduleComponent, canActivate: [AuthGuard] },
  { path: 'mySchedule', component: MyScheduleComponent, canActivate: [AuthGuard] },
  { path: 'mySchedule/geospatial', component: GeospatialComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
