import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Route } from '../models/route';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RouteService {
  constructor(private http: HttpClient) {}

  private routesUrl = 'http://localhost:8080/routes';

  routes: Route[];
  currentRoute: Route;
  purchasedSeats: number[] = [];
  railroadCarNumber: number;
  /**
   * Adds a route and returns a Observable of them
   * 
   * @param route Route to be added
   * @returns Observable of Routes
   */
  addRoute(route: Route): Observable<Route> {
    return this.http.post(this.routesUrl, route, httpOptions).pipe(
      tap((route: Route) => console.log('added route')),
      catchError(this.handleError<Route>('addRoute'))
    );
  }
  /**Fetches Routes from server */
  getRoutes() {
    return this.http.get<Route[]>(this.routesUrl).pipe(
      catchError(this.handleError('getRoutes', []))
    );
  }
  /**
   * Sets currentRoute to the one given as a parametre
   * 
   * @param route Current Route
   */
  setCurrentRoute(route: Route) {
    this.currentRoute = route;
  }
  /**
   * Returns the current Route.
   * 
   * @returns current Route
   */
  getCurrentRoute() {
    return this.currentRoute;
  }
  /**
   * Reserves seats for the Route given as a parametre
   * 
   * @param route Route to reserve seats on
   * @returns Observable of Routes
   */
  reserveSeats(route: Route): Observable<Route> {
    return this.http.put(this.routesUrl, route, httpOptions).pipe(
      catchError(this.handleError<any>('reserveSeats'))
    );
  }
  /**
   * Adds a seat to purchases
   * 
   * @param seatNumber Number of the seat purchased
   */
  addPurchasedSeat(seatNumber: number) {
    this.purchasedSeats.push(seatNumber);
  }
  /**
   * Returns purchased seats
   * 
   * @returns Purchased seats
   */
  getPurchasedSeats() {
    return this.purchasedSeats;
  }
  /**Resets class variable purchasedSeats */
  resetPurchasedSeats() {
    this.purchasedSeats = [];
  }
  /**
   * Sets class variable railroadCarNumber to the one given as parameter.
   * 
   * @param railroadCarNumber Number of the current railroadCar.
   */
  setRailroadCarNumber(railroadCarNumber: number) {
    this.railroadCarNumber = railroadCarNumber;
  }
  /**
   * Returns class variable railroadCarNumber
   * 
   * @returns current railroadCarNumber
   */
  getRailroadCarNumber() {
    return this.railroadCarNumber;
  }
  /**
   * Handles errors.
   * 
   * @param operation Operation name set
   * @param result error to be handled
   * @returns error
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
