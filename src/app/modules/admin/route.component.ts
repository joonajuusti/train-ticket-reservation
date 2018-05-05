import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Route } from '../../models/route';
import { RouteService } from '../../services/route.service';
import { AlertService } from '../../services/alert.service';

@Component({
  templateUrl: './route.component.html'
})
export class RouteComponent {
  constructor(
    private routeService: RouteService,
    private alertService: AlertService
  ) {}

  addRoute(form: NgForm) {
    const wayStations = this.checkWayStations(form.value.wayStations);
    const route = new Route(
      form.value.train,
      form.value.departureCity,
      form.value.arrivalCity,
      form.value.departureTime,
      form.value.arrivalTime,
      wayStations
    );
    this.routeService.addRoute(route)
      .subscribe(user => {
        this.alertService.success('Added route succesfully', false);
      });
  }
  checkWayStations(wayStationsString) {
    if(wayStationsString !== null) return wayStationsString.split(' ');
    else return null;
  }

}
