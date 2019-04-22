import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EmployeeComponent } from './employee/employee.component';
import { CustomMaterialModule } from './core/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { MyScheduleComponent } from './my-schedule/my-schedule.component';
import { HttpClientModule } from '@angular/common/http';
import { IsVisibleDirective } from './is-visible.directive';
import { LogoutDirective } from './logout.directive';
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from '@angular/fire';
import { config } from 'src/environments/configKeys';
import { GeospatialComponent } from './geospatial/geospatial.component';
import { AgmDirectionModule } from 'agm-direction';

export const fireBaseCongig = config.firebaseConfig


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeComponent,
    ScheduleComponent,
    MyScheduleComponent,
    IsVisibleDirective,
    LogoutDirective,
    GeospatialComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: config.googleMapsKey
    }),
    AngularFireModule.initializeApp(fireBaseCongig),
    AgmDirectionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
