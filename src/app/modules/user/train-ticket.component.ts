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
  noSearchResultRoutes: boolean = false;

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.getRoutes();
    this.routeService.resetPurchasedSeats();
  }
  /**Fetches available Routes from server.
   */
  getRoutes() {
    this.routeService.getRoutes().subscribe(routes => {
      this.routes = routes;
    });
  }
  /**
   * Finds if there are available routes with 2 given destinations
   * 
   * @param form A form containing values of the route search form
   */
  findRoutes(form: NgForm) {
    this.findRoutesBetweenTwoCities(form.value.departureCity, form.value.arrivalCity);
    if(this.searchByDepartureTime(form.value.departureTime)){
      this.filterByDepartureTime(form.value.departureTime);
    }else {
      this.filterByArrivalTime(form.value.arrivalTime);
    }this.removeRoutesWithInsufficientSeating(form.value.tickets);
    (this.searchResultRoutes.length === 0) ? this.noSearchResultRoutes = true : this.noSearchResultRoutes = false;
  }
  /**
   * Uses search-forms city values to set attribute searchResultRoutes to available routes
   * 
   * @param departureCity String value of desired departure city
   * @param arrivalCity String value of desired arrival city
   */
  findRoutesBetweenTwoCities(departureCity: string, arrivalCity: string) {
    this.searchResultRoutes = [];
    this.searchResultRoutes = this.routes.filter(route => {
      return departureCity.toUpperCase() === route.departureCity &&
        arrivalCity.toUpperCase() === route.arrivalCity;
    });
  }
  /**
   * Searches for routes starting from departure time given as parametre
   * 
   * @param departureTime String value for desired departure time
   */
  searchByDepartureTime(departureTime: string) {
    let departureTimeDate = new Date(departureTime);
    if(departureTimeDate.valueOf() !== 0) return true;
    return false;
  }

  /**
   * Filters routes starting from departure time given as parametre
   * 
   * @param time String value for desired time
   */
  filterByDepartureTime(time: string) {
    let timeInMilliseconds = new Date(time).valueOf();
    this.searchResultRoutes = this.searchResultRoutes.filter(route => {
      return Math.abs(timeInMilliseconds - new Date(route.departureTime).valueOf()) < 3600000
    });
  }

  /**
   * Filters routes starting from arrival time given as parametre
   * 
   * @param time String value for desired time
   */
  filterByArrivalTime(time: string) {
    let timeInMilliseconds = new Date(time).valueOf();
    this.searchResultRoutes = this.searchResultRoutes.filter(route => {
      return Math.abs(timeInMilliseconds - new Date(route.arrivalTime).valueOf()) < 3600000
    });
  }
  /**
   * Filters out Routes that don't have enough available seats for reservation.
   * The amount of seats to be reserved is given as a parametre. 
   * 
   * @param tickets Integer containing number of seats to be reserved
   */
  removeRoutesWithInsufficientSeating(tickets: number) {
    this.searchResultRoutes = this.searchResultRoutes.filter(route => {
      return route.availableSeats >= tickets;
    });
  }
  /**
   * Resets the search-form and clears the attribute searchResultRoutes  
   * 
   * @param form a NgForm used in searching for Routes
   */
  clear(form: NgForm) {
    form.reset();
    this.searchResultRoutes = [];
  }
}
