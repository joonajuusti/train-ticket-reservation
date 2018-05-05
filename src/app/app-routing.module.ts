import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { UserComponent } from './modules/user/user.component';
import { UserAccountComponent } from './modules/user/user-account.component';
import { AdminComponent } from './modules/admin/admin.component';
import { TrainTicketComponent } from './modules/user/train-ticket.component';
import { UserInformationComponent } from './modules/user/user-information.component';
import { UserPasswordComponent } from './modules/user/user-password.component';
import { RouteComponent } from './modules/admin/route.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user',
    component: UserComponent,
    children: [
      //{ path: '', redirectTo: 'account', pathMatch: 'full' },
      { path: 'tickets', component: TrainTicketComponent },
      { path: 'account',
        component: UserAccountComponent,
        children: [
          { path: 'information', component: UserInformationComponent },
          { path: 'password', component: UserPasswordComponent }
        ]
      },
      { path: 'admin',
        component: AdminComponent,
        children: [
          { path: 'routes', component: RouteComponent }
        ]}
    ]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
