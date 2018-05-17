import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Route } from '../../models/route';
import { User } from '../../models/user';

import { UserService } from '../../services/user.service';
import { RouteService } from '../../services/route.service';
import { AlertService } from '../../services/alert.service';

const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

@Component({
  selector: 'route-card',
  templateUrl: './route-card.component.html'
})
export class RouteCardComponent implements OnInit {
  constructor(
    private routeService: RouteService,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  @Input() route: Route;

  arrivalTimeString: string;
  departureTimeString: string;
  travelDateString: string;
  currentUser: User;

  ngOnInit(){
    this.currentUser = this.userService.getCurrentUser();
    this.departureTimeString = new Date(this.route.departureTime).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
    this.arrivalTimeString = new Date(this.route.arrivalTime).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
    this.travelDateString = new Date(this.route.departureTime).toLocaleDateString('en-GB', dateOptions);
  }

  proceedToPurchase() {
    if(this.currentUser.creditCard === null) {
      this.alertService.error('You have to add a valid credit card to your account before purchasing tickets', false);
      return;
    }
    this.routeService.setCurrentRoute(this.route);
    this.router.navigateByUrl('user/seats');
    console.log(this.route.id);
  }
}
