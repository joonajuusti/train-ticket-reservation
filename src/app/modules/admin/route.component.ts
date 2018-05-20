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
export class RouteComponent implements OnInit{
  constructor(
    private routeService: RouteService,
    private alertService: AlertService,
    private trainService: TrainService
  ) {}

  trains: Train[];

  ngOnInit() {
    this.getTrains();
  }
  /**
   * Getter for Trains
   */
  getTrains() {
    this.trainService.getTrains().subscribe(trains => {
      this.trains = trains;
      console.log(this.trains);
    });
  }
  /**
   * Adds a Route based on form input
   * 
   * @param form A form with data to create a new Route
   */
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
      form.value.pricePerSeat,
      wayStations
    );
    this.routeService.addRoute(route)
      .subscribe(user => {
        this.alertService.success('Added route succesfully', false);
      });
  }
  /**
   * Takes string with waystations and splits it up to a String array
   * 
   * @param wayStationsString String containing Routes waystations separated by space
   * @returns String[] containing all waystations of given parametres
   * @returns null if parametres is empty
   */
  checkWayStations(wayStationsString) {
    if(wayStationsString !== null) return wayStationsString.split(' ');
    else return null;
  }

}
