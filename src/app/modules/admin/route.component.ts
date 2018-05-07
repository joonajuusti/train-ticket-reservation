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

  ngOnInit() { 
    //Show current time on route departure and arrival
    //TO-DO 
    var v: string;
    var d = new Date()
    var month;
    month = d.getMonth();
    var day = d.getDate();
    v=d.getFullYear() +"-0"+ d.getMonth() +"-0"+ d.getDate() +"T"+ d.getHours() +":"+ d.getMinutes();
    (<HTMLInputElement>document.getElementById("deptTime")).value = v;
    (<HTMLInputElement>document.getElementById("arriTime")).value = v;
  }

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

  currentDate() {
    var value: string;
    var d = new Date()
    value=d.getFullYear +"-"+ d.getMonth +"-"+ d.getDate +"T"+ d.getHours +":"+ d.getMinutes;
    alert(value);
    alert(document.getElementById("deptTime").innerHTML) 
  }
}
