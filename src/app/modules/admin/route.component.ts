import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Route } from '../../models/route';
import { Train } from '../../models/train';


import { RouteService } from '../../services/route.service';
import { AlertService } from '../../services/alert.service';
import { TrainService } from '../../services/train.service';

@Component({
  templateUrl: './route.component.html'
})
<<<<<<< HEAD
export class RouteComponent implements OnInit{
=======

export class RouteComponent {
>>>>>>> f4084a8116bd7e86612b6b72b1f321dab81f7712
  constructor(
    private routeService: RouteService,
    private alertService: AlertService,
    private trainService: TrainService
  ) {}

<<<<<<< HEAD
  trains: Train[];

  ngOnInit() {
    this.getTrains();
    this.setTime();
  }

  getTrains() {
    this.trainService.getTrains().subscribe(trains => {
      this.trains = trains;
      console.log(this.trains);
    });
  }
=======
  ngOnInit() { 
    this.setTime();
    }
>>>>>>> f4084a8116bd7e86612b6b72b1f321dab81f7712

  addRoute(form: NgForm) {
    const wayStations = this.checkWayStations(form.value.wayStations);
    const train = form.value.train;
    console.log(train.railroadCar);
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
  setTime(){
    //Show current time on route departure and arrival
    var v: string;
    var d = new Date()

    let month : any;
    month = d.getMonth();
    if (month<10){
      month = "0" + (<string><any>month);
    }
<<<<<<< HEAD

    let date : any;
    date = d.getDate();
    if (date<10){
      date = "0" + (<string><any>date);
    }

=======

    let date : any;
    date = d.getDate();
    if (date<10){
      date = "0" + (<string><any>date);
    }

>>>>>>> f4084a8116bd7e86612b6b72b1f321dab81f7712
    var day = d.getDate();
    v=d.getFullYear() +"-"+month +"-"+ date +"T"+ d.getHours() +":"+ d.getMinutes();
    (<HTMLInputElement>document.getElementById("deptTime")).value = v;
    (<HTMLInputElement>document.getElementById("deptTime")).min = v;
    (<HTMLInputElement>document.getElementById("arriTime")).value = v;
    (<HTMLInputElement>document.getElementById("arriTime")).min = v;

  }
}
