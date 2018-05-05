import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { UserService } from './services/user.service';
import { UserComponent } from './modules/user/user.component';
import { UserAccountComponent } from './modules/user/user-account.component';
import { TrainTicketComponent } from './modules/user/train-ticket.component';
import { AdminComponent } from './modules/admin/admin.component';
import { UserInformationComponent } from './modules/user/user-information.component';
import { UserPasswordComponent } from './modules/user/user-password.component';
import { RouteComponent } from './modules/admin/route.component';
import { AlertService } from './services/alert.service';
import { AlertComponent } from './modules/alert/alert.component';
import { RouteService } from './services/route.service';


import { AppRoutingModule } from './app-routing.module';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    UserAccountComponent,
    AdminComponent,
    TrainTicketComponent,
    UserInformationComponent,
    UserPasswordComponent,
    AlertComponent,
    RouteComponent
  ],
  providers: [
    UserService,
    AlertService,
    RouteService
   ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
