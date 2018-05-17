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
import { TrainComponent } from './modules/admin/train.component';
import { LocomotiveComponent } from './modules/admin/locomotive.component';
import { RailroadCarComponent } from './modules/admin/railroad-car.component';
import { TrainAssemblyComponent } from './modules/admin/train-assembly.component';
import { SeatPickerComponent } from './modules/user/seat-picker.component';
import { TicketPurchaseComponent } from './modules/user/ticket-purchase.component';
import { PurchaseSearchComponent } from './modules/admin/purchase-search.component';
import { PurchaseManageComponent } from './modules/admin/purchase-manage.component';
import { UserPurchasesListComponent } from './modules/user/user-purchases-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'account', pathMatch: 'full' },
      { path: 'tickets', component: TrainTicketComponent },
      { path: 'seats', component: SeatPickerComponent },
      { path: 'purchase', component: TicketPurchaseComponent },
      { path: 'account',
        component: UserAccountComponent,
        children: [
          { path: '', redirectTo: 'purchases', pathMatch: 'full'},
          { path: 'purchases', component: UserPurchasesListComponent },
          { path: 'information', component: UserInformationComponent },
          { path: 'password', component: UserPasswordComponent }
        ]
      },
      { path: 'admin',
        component: AdminComponent,
        children: [
          { path: '', redirectTo: 'routes', pathMatch: 'full'},
          { path: 'routes', component: RouteComponent },
          { path: 'purchases', component: PurchaseSearchComponent },
          { path: 'purchase-manage', component: PurchaseManageComponent },
          { path: 'trains',
            component: TrainComponent,
            children: [
              { path: '', redirectTo: 'assembly', pathMatch: 'full' },
              { path: 'assembly', component: TrainAssemblyComponent },
              { path: 'locomotives', component: LocomotiveComponent },
              { path: 'railroadcars', component: RailroadCarComponent }
            ]}
        ]}
    ]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
