import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { RouteService } from '../../services/route.service';
import { Route } from '../../models/route';
import { RailroadCar } from '../../models/railroad-car';

@Component({
  templateUrl: './seat-picker.component.html'
})
export class SeatPickerComponent implements OnInit {
  constructor(private routeService: RouteService) {}

  currentRoute: Route;
  arrayOfLengthOfThree: number[] = [0, 0, 0];
  arrayOfNumberOfRows: number[];
  currentRailroadCar: number;
  railroadCarAmount: number;
  currentRailroadCarSeatsTaken: boolean[] = [];

  ngOnInit() {
    this.currentRoute = this.routeService.getCurrentRoute();
    this.arrayOfNumberOfRows = new Array(this.currentRoute.train.railroadCar.numberOfRows);
    this.railroadCarAmount = this.currentRoute.train.railroadCarAmount;
    this.currentRailroadCar = 0;
  }

  previousCar() {
    if(this.currentRailroadCar > 0) {
      this.currentRailroadCar--;
    }
  }

  nextCar() {
    if(this.currentRailroadCar < this.railroadCarAmount - 1) {
      this.currentRailroadCar++;
    }
  }

  proceed(form: NgForm) {
    for(let i = 0; i < this.currentRailroadCarSeatsTaken.length; i++) {
      if(this.currentRailroadCarSeatsTaken[i] === true) {
        this.currentRoute.seatsTaken[this.currentRailroadCar].push(i);
        this.currentRoute.availableSeats--;
      }
    }
    console.log('Reserved seats on railroad car ' + this.currentRailroadCar);
    console.log(this.currentRoute.seatsTaken[this.currentRailroadCar]);
    this.routeService.reserveSeats(this.currentRoute).subscribe();
  }
}
