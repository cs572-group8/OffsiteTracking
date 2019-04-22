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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IsVisibleDirective } from './is-visible.directive';
import { LogoutDirective } from './logout.directive';
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from '@angular/fire';
import { config } from 'src/environments/configKeys';
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './redux/reducers';
import { LogoutComponent } from './logout/logout.component'
import { TokenInterceptor } from './interceptors/token.interceptor';

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
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 10, // Retains last 10 states
    }),
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: config.googleMapsKey
    }),
    AngularFireModule.initializeApp(fireBaseCongig)
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
