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

  addRoute(route: Route): Observable<Route> {
    return this.http.post(this.routesUrl, route, httpOptions).pipe(
      tap((route: Route) => console.log('added route')),
      catchError(this.handleError<Route>('addRoute'))
    );
  }

  getRoutes() {
    return this.http.get<Route[]>(this.routesUrl).pipe(
      catchError(this.handleError('getRoutes', []))
    );
  }

  setCurrentRoute(route: Route) {
    this.currentRoute = route;
  }

  getCurrentRoute() {
    return this.currentRoute;
  }

  reserveSeats(route: Route): Observable<Route> {
    return this.http.put(this.routesUrl, route, httpOptions).pipe(
      catchError(this.handleError<any>('reserveSeats'))
    );
  }

  addPurchasedSeat(seatNumber: number) {
    this.purchasedSeats.push(seatNumber);
  }

  getPurchasedSeats() {
    return this.purchasedSeats;
  }

  resetPurchasedSeats() {
    this.purchasedSeats = [];
  }

  setRailroadCarNumber(railroadCarNumber: number) {
    this.railroadCarNumber = railroadCarNumber;
  }

  getRailroadCarNumber() {
    return this.railroadCarNumber;
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
