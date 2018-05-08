import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Route } from '../../models/route';

import { RouteService } from '../../services/route.service';

const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

@Component({
  selector: 'route-card',
  templateUrl: './route-card.component.html'
})
export class RouteCardComponent implements OnInit {
  constructor(private routeService: RouteService, private router: Router) {}

  @Input() route: Route;

  arrivalTimeString: string;
  departureTimeString: string;
  travelDateString: string;

  ngOnInit(){
    this.departureTimeString = new Date(this.route.departureTime).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
    this.arrivalTimeString = new Date(this.route.arrivalTime).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
    this.travelDateString = new Date(this.route.departureTime).toLocaleDateString('en-GB', dateOptions);
  }

  proceedToPurchase() {
    this.routeService.setCurrentRoute(this.route);
    this.router.navigateByUrl('user/seats');
  }
}
