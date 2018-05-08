import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { RouteService } from '../../services/route.service';
import { Route } from '../../models/route';

@Component({
  templateUrl: './train-ticket.component.html'
})
export class TrainTicketComponent implements OnInit {
  constructor(
    private userService: UserService,
    private routeService: RouteService
  ) {}

  currentUser: User;
  routes: Route[];
  searchResultRoutes: Route[];
  finalRoutes: Route[];
  
  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.getRoutes();
    this.setTime();
  }

  getRoutes() {
    this.routeService.getRoutes().subscribe(routes => {
      this.routes = routes;
    });
  }

  findRoutes(form: NgForm) {
    this.findRoutesBetweenTwoCities(form.value.departureCity, form.value.arrivalCity);
    if(this.searchByDepartureTime(form.value.departureTime)){
      this.filterByDepartureTime(form.value.departureTime);
    }else {
      this.filterByArrivalTime(form.value.arrivalTime);
    }this.removeRoutesWithInsufficientSeating(form.value.tickets);
  }

  findRoutesBetweenTwoCities(departureCity: string, arrivalCity: string) {
    this.searchResultRoutes = [];
    this.searchResultRoutes = this.routes.filter(route => {
      return departureCity.toUpperCase() === route.departureCity &&
        arrivalCity.toUpperCase() === route.arrivalCity;
    });
  }

  searchByDepartureTime(departureTime: string) {
    let departureTimeDate = new Date(departureTime);
    if(departureTimeDate.valueOf() !== 0) return true;
    return false;
  }

  filterByDepartureTime(time: string) {
    let timeInMilliseconds = new Date(time).valueOf();
    this.searchResultRoutes = this.searchResultRoutes.filter(route => {
      return Math.abs(timeInMilliseconds - new Date(route.departureTime).valueOf()) < 3600000
    });
  }

  filterByArrivalTime(time: string) {
    let timeInMilliseconds = new Date(time).valueOf();
    this.searchResultRoutes = this.searchResultRoutes.filter(route => {
      return Math.abs(timeInMilliseconds - new Date(route.arrivalTime).valueOf()) < 3600000
    });
  }

  removeRoutesWithInsufficientSeating(tickets: number) {
    this.searchResultRoutes = this.searchResultRoutes.filter(route => {
      return route.availableSeats >= tickets;
    });
  }

  clear(form: NgForm) {
    form.reset();
    this.searchResultRoutes = [];
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

    let date : any;
    date = d.getDate();
    if (date<10){
      date = "0" + (<string><any>date);
    }

    var day = d.getDate();
    v=d.getFullYear() +"-"+month +"-"+ date +"T"+ d.getHours() +":"+ d.getMinutes();
    (<HTMLInputElement>document.getElementById("deptTime")).value = v;
    (<HTMLInputElement>document.getElementById("deptTime")).min = v;
    (<HTMLInputElement>document.getElementById("arriTime")).value = v;
    (<HTMLInputElement>document.getElementById("arriTime")).min = v;

  }
}
