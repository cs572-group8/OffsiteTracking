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

const routes: Routes = [
  { path: 'user', component: EmployeeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'mySchedule', component: MyScheduleComponent },
  { path: 'Schedule', component: ScheduleComponent },
  { path: 'mySchedule/geospatial', component: GeospatialComponent },
  { path: 'password', component: PasswordComponent },
  { path: '', component: LoginComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
