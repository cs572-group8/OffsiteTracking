import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { MyScheduleComponent } from './my-schedule/my-schedule.component';
import { ScheduleComponent } from './schedule/schedule.component';
<<<<<<< HEAD
import { GeospatialComponent } from './geospatial/geospatial.component';
=======
import { LogoutComponent } from './logout/logout.component';
>>>>>>> c9fdc6f5bada563ad5dc8f137aec54999be454c2

const routes: Routes = [
  { path: 'user', component: EmployeeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'mySchedule', component: MyScheduleComponent },
  { path: 'Schedule', component: ScheduleComponent },
  { path: 'mySchedule/geospatial', component: GeospatialComponent },
  { path: '', component: LoginComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
