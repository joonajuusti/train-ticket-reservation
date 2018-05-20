import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { RouteService } from '../../services/route.service';
import { Route } from '../../models/route';
import { RailroadCar } from '../../models/railroad-car';

@Component({
  templateUrl: './seat-picker.component.html',
  styles:[`
    .car{
      display: inline-block;
      margin: 10px 10px 10px 10px;
    }
    .car-text{
      display: flex;
      justify-content:center;
      align-content:center;
      flex-direction:column;
      margin: 0 5px 0 5px;
    }
    .car-select{
      margin: 0 10px 0 10px;
    }
  `]
})
export class SeatPickerComponent implements OnInit {
  constructor(
    private routeService: RouteService,
    private router: Router
  ) {}

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
  /**Sets currentRailroadCar to the previous one */
  previousCar() {
    if(this.currentRailroadCar > 0) {
      this.currentRailroadCar--;
    }
  }
  /**Sets currentRailroadCar to the next one */
  nextCar() {
    if(this.currentRailroadCar < this.railroadCarAmount - 1) {
      this.currentRailroadCar++;
    }
  }
  /**
   * Updates seats taken for this Route.
   * Proceeds to the purchase of the selected seat.
   */
  proceed() {
    this.updateSeatsTaken(this.currentRoute, this.currentRailroadCarSeatsTaken, this.currentRailroadCar);
    this.updateAvailableSeats(this.currentRoute);
    console.log('Reserved seats on railroad car ' + this.currentRailroadCar + 1);
    console.log(this.currentRoute.seatsTaken[this.currentRailroadCar]);
    this.routeService.reserveSeats(this.currentRoute).subscribe();
    this.routeService.setRailroadCarNumber(this.currentRailroadCar);
    this.router.navigateByUrl('user/purchase');
  }
  /**
   * TODO
   * 
   * @param currentRoute 
   * @param currentRailroadCarSeatsTaken 
   * @param currentRailroadCar 
   */
  updateSeatsTaken(currentRoute: Route, currentRailroadCarSeatsTaken: boolean[], currentRailroadCar: number) {
    for(let i = 0; i < currentRailroadCarSeatsTaken.length; i++) {
      if(currentRailroadCarSeatsTaken[i] === true) {
        if(!currentRoute.seatsTaken[currentRailroadCar].includes(i)) {
          currentRoute.seatsTaken[currentRailroadCar].push(i);
          this.routeService.addPurchasedSeat(i);
        }
      }
    }
  }
  /**
   * Updates the available seats for the Route given as a parametre.
   * 
   * @param currentRoute The Route the reservation is happening on
   */
  updateAvailableSeats(currentRoute: Route) {
    currentRoute.availableSeats = currentRoute.train.railroadCarAmount * this.arrayOfNumberOfRows.length * 6 -
    currentRoute.seatsTaken.map(array => array.length).reduce((acc, value) => acc + value);
  }
}
