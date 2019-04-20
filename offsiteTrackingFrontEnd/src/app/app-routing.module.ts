import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { MyScheduleComponent } from './my-schedule/my-schedule.component';
import { ScheduleComponent } from './schedule/schedule.component';



const routes: Routes = [
  { path: 'user', component: EmployeeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'mySchedule', component: MyScheduleComponent },
  { path: 'Schedule', component: ScheduleComponent },
  {path : '', component : LoginComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
